import { Router } from "express";
import passport from "passport";
import { testLogin, createUser,destroySession,currentUser } from "../controllers/session.controller.js";
import { isLogin,roleVerification,isAuthenticated } from "../middlewares/authentication.js";

const routerSession = Router();

routerSession.post("/register", passport.authenticate("register"), createUser);
routerSession.get("/register",isLogin, (req, res) => {
  res.render("register", {});
});
routerSession.post("/login", passport.authenticate("login"), testLogin);
routerSession.get("/login", isLogin, (req, res) => {
  if (!req.session.user) res.render("login", {});
});
routerSession.get("/logout", destroySession);

routerSession.get("/current",isAuthenticated,roleVerification("User"),currentUser)

export default routerSession;
