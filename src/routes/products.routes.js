import {
  productGetById,
  addProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getProductsPag
} from "../controllers/product.controller.js";
import { Router } from "express";
import { isAuthenticated,roleVerification } from "../middlewares/authentication.js";
const routerProduct = Router();

routerProduct.get("/",isAuthenticated, getProductsPag);

routerProduct.get("/:pid",isAuthenticated, productGetById);

routerProduct.post("/",isAuthenticated,roleVerification("Admin"), addProduct);

routerProduct.delete("/:id",isAuthenticated,roleVerification("Admin"), deleteProduct);

routerProduct.put("/:id",isAuthenticated,roleVerification("Admin"), updateProduct);

export default routerProduct;
