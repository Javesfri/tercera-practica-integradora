import ticketModel from "../models/MongoDB/ticketModel.js";

export const generateTicket = async(total,email)=>{
    try{
        const newTicket =await new ticketModel({amount:total,purchaser: email})
        await newTicket.save()
        return newTicket
    }catch(error){
        console.log(error)
        return(error)
    }
    
}