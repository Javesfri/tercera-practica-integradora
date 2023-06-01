import mongoose, { Schema, model } from "mongoose";
import {nanoid} from "nanoid"
let ticketModel;

if(mongoose.models["tickets"]){
    ticketModel = mongoose.models["tickets"]
}else{
    const ticketSchema = new mongoose.Schema({
        code: {
            type: String,
            unique: true,
            default: () =>nanoid(10)
        },
        purchase_datetime:{
            type: Date,
            required: true,
            default: () => Date.now()
        },
        amount:{
            type: Number,
            required:true,
        },
        purchaser:{
            type: String,
            required: true,
        }
        
    })
    ticketModel = mongoose.model("tickets",ticketSchema)
}

export default ticketModel
