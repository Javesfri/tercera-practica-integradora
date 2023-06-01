import {
  addProductToCart,
  deleteProductFromCart,
  deleteAllProductsFromCart,
  getProductsFromCart,
  updateProductFromCart,
  createCart,
  getAllCarts,
} from "../services/cartService.js";
import {getProductById,productUpdate} from "../services/productService.js"
import { generateTicket } from "../services/ticketService.js";

export const cartCreate = async (req, res) => {
  const newCart = await createCart();
  res.send(newCart);
};

export const getCarts = async (req, res) => {
  const newCart = await getAllCarts();
  res.send(newCart);
};

export const getProductsCart = async (req, res) => {
  const cart = await getProductsFromCart(req.params.cid);
  const listProducts = await cart.products;
  const products=[]
  listProducts.map(prod =>{
    let newProduct={...prod.productId._doc}
    newProduct.quantity=prod.quantity
    newProduct.cartId=req.params.cid
    //console.log(newProduct)
    products.push(newProduct)
  })
  res.render("cart", {products,cartId:req.params.cid});
};

export const AddProductCart = async (req, res) => {
  const addProduct = await addProductToCart(req.params.cid, req.params.pid);
  res.redirect("/api/products")
};

export const deleteProductCart = async (req, res) => {
   const deleteProductOfCart = await deleteProductFromCart(
    req.params.cid,
    req.params.pid
  );
  res.send(deleteProductOfCart);
};

export const deleteAllProductsCart = async (req, res) => {
  const deleteAllProducts = await deleteAllProductsFromCart(req.params.cid);
  res.send(deleteAllProducts);
};

export const updateProductCart = async (req, res) => {
  const updateProduct = await updateProductFromCart(
    req.params.cid,
    req.params.pid,
    req.body
  );
  res.send(updateProduct);
};

export const purchaseCart = async (req,res) =>{
  const cartID=req.params.cid
  const cart = await getProductsFromCart(req.params.cid)
  const products= cart.products
  //console.log(products)
  let ticketData
  console.log("Productos: "+products.length)
  if(products.length > 0){
    let amount=0;
    let idsProductNoStock=[]
    await Promise.all(products.map(async prod =>{
      // console.log(prod.productId)
       let product =await getProductById(prod.productId._id)
       if(prod.quantity <= product.stock){
         await productUpdate(prod.productId._id,{stock:product.stock-prod.quantity});
         amount+=prod.productId.price*prod.quantity;
         console.log(prod.productId._id)
         await deleteProductFromCart(cartID,prod.productId._id)
       }else{
         idsProductNoStock.push(prod.productId)
       }
 
     })) 
    console.log(amount)
    if( amount >0){
      ticketData =await generateTicket(amount,req.session.user.email)
      console.log("Compra Realizada con Exito")
      res.render("purchase",{hora:ticketData.purchase_datetime,total:ticketData.amount,comprador:ticketData.purchaser})

    }else{
      console.log("No Hay ningun producto seleccionado en stock. Sera redirigido a la lista de productos")
      res.redirect("/api/products")
      return
      
    }
  }else{
    console.log("No Hay productos En El Carrito")
    res.redirect("/api/products")
    return
  }
 
}
