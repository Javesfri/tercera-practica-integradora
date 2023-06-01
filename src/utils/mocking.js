import {faker} from "@faker-js/faker";

export const generateProduct =() =>{
    return{
        _id:faker.database.mongodbObjectId(),
        title:faker.commerce.productName(),
        description:faker.commerce.productDescription(),
        price:faker.commerce.price(),
        stock:faker.number.int({min:10,max:20}),
        code:faker.string.nanoid(10),
        category:faker.commerce.product(),
        thumbnail:faker.image.url(),
        
    }
}