import {
  productGetById,
  addProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getProductsPag
} from "../controllers/product.controller.js";
import { Router } from "express";
import { isAuthenticated,roleVerification,isAdminOrPremium} from "../middlewares/authentication.js";
const routerProduct = Router();

routerProduct.get("/",isAuthenticated, getProductsPag);

routerProduct.post("/",isAuthenticated,roleVerification("Admin"), addProduct);
routerProduct.get("/addproduct",isAuthenticated,isAdminOrPremium, (req,res)=>{
  res.render("addproduct",{})
})
routerProduct.post("/addproduct",isAuthenticated,isAdminOrPremium, addProduct,(req,res)=>{
  res.redirect("/api/products")
})
routerProduct.get("/:pid",isAuthenticated, productGetById);

routerProduct.delete("/:id",isAuthenticated,roleVerification("Admin"), deleteProduct);

routerProduct.put("/:id",isAuthenticated,roleVerification("Admin"), updateProduct);

export default routerProduct;
