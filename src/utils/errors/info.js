export const generateUserErrorInfo =(user)=>{
    return `Una o mas propiedades estan incompletas o son invalidas.
    Lista de las propiedades requeridas:
    *first_name: Debe ser un String, se recibió: ${user.first_name}
    *last_name: Debe ser un String, se recibió: ${user.last_name}
    *email: Debe ser un String, se recibió: ${user.email}
    *age: Debe ser un Number, se recibió: ${user.age}
    `
}

export const generateAddToCartErrorInfo=(product)=>{
    return `No hay suficiente Stock del  producto ${product.title}.
            Stock de producto: ${product.stock}`
}
