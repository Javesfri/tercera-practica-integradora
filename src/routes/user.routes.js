import {getUsers} from "../controllers/user.controller.js"
import { Router } from "express";


const routerUser = Router();


routerUser.get("/", getUsers)



export default routerUser
