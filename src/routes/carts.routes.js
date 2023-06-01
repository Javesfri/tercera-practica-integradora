import { Router } from "express";
import {
  cartCreate,
  getCarts,
  getProductsCart,
  AddProductCart,
  deleteProductCart,
  deleteAllProductsCart,
  updateProductCart,
  purchaseCart
} from "../controllers/cart.controller.js";
import { isAuthenticated,roleVerification } from "../middlewares/authentication.js";
const routerCart = Router();

routerCart.post("/",isAuthenticated, cartCreate);

routerCart.get("/",isAuthenticated, getCarts);

routerCart.get("/:cid",isAuthenticated,roleVerification("User"), getProductsCart);

routerCart.post("/:cid/products/:pid",isAuthenticated,roleVerification("User"), AddProductCart);

routerCart.delete("/:cid/products/:pid",isAuthenticated,roleVerification("User"), deleteProductCart);

routerCart.delete("/:cid",isAuthenticated,roleVerification("User"), deleteAllProductsCart);

routerCart.put("/:cid/products/:pid",isAuthenticated,roleVerification("User"), updateProductCart);

routerCart.post("/:cid/purchase",isAuthenticated,roleVerification("User"),purchaseCart)
routerCart.get("/:cid/purchase",roleVerification("User"),isAuthenticated)

export default routerCart;
