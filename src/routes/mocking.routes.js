import { Router } from "express";
import {generateProduct} from "../utils/mocking.js"
const routerMocking = Router();


routerMocking.get("/",async (req,res) =>{
    let products=[]
    for(let i=0;i<100;i++){
        products.push(generateProduct())
    }
    res.send(products)
})

export default routerMocking