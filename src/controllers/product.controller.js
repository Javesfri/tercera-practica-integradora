
import {
  getPagProducts,
  productAdd,
  productDelete,
  productUpdate,
  getAllProducts,
  getProductById,
} from "../services/productService.js";

export const getProductsPag = async (req, res) => {
  const mail =req.session.user.email;
  const rol = req.session.user.rol;
  const cart=req.session.user.idCart
  const category = req.query.category;
  const sort = req.query.sort;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const data = await getPagProducts(category, sort, page, limit);
  const products = [...data.docs];
  const total = [];
  products.map((prod) => {
    const newProd = { ...prod._doc };
    const {_id, title, description, price, code, category, thumbnail, stock } = {
      ...newProd,
    };
    total.push({
      id:_id,
      idCart:cart,
      title: title,
      description: description,
      price: price,
      code: code,
      category: category,
      stock: stock,
      imagen: thumbnail,
    });
  });
  const pages = data.totalPages;
  let totalPages = [];
  for (let i = 1; i <= pages; i++) {
    totalPages.push({ page: i });
  }
  res.render("products", {
    products: total,
    pages: totalPages,
    mail: mail,
    rol: rol,
    cart:cart,
  });}


export const productGetById = async (req, res) => {
  let product = await getProductById(req.params.pid);
  res.send(product);
};

export const addProduct = async (req, res) => {
  let newProduct = productAdd(req.body);
  res.send(newProduct);
};

export const deleteProduct = async (req, res) => {
  await productDelete(req.params.id);
  res.send(await getProducts());
};

export const updateProduct = async (req, res) => {
  let product = await productUpdate(req.params.id, req.body);
  res.send(product);
};

export const getProducts = async () => {
  try {
    return await getAllProducts();
  } catch (error) {
    return error;
  }
};
