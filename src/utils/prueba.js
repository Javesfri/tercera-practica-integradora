//Test Driven Development -Desarrollo orientado a pruebas
//Ejemlo: Suma
let testPasados=0
let testTotales=4
const suma =(...nums) =>{
    if(nums.length==0){
        return 0
    }
    if(!nums.every(num =>typeof num ==="number"))return null
    return (nums.reduce((prev,current)=>prev+current))
   

}


//Etapa 1: --Escribir pruebas fallidas--


//1) La función debe devolver null si algún parámetro no es numérico.
console.log("Test 1: La función debe devolver null si algún parámetro no es numérico. ")
let resultTest1 =suma("2",2)
if(resultTest1===null){
    console.log("Test 1 pasado")
    testPasados++
}
else{
    console.log(`Test 1 no pasado, se recibio ${typeof resultTest1}, pero se esperaba null`)
}


//2) La función debe devolver 0 si no se pasó ningún parámetro.
let resultTest2 =suma()
console.log("La función debe devolver 0 si no se pasó ningún parámetro. ")
if(resultTest2 ==0){
    console.log("Test 2 pasado")
    testPasados++
}
else{
    console.log(`Test 2 no pasado, se recibio ${resultTest2}, pero se esperaba 0`)
}
//3) La función debe poder realizar la suma correctamente.
let resultTest3=suma(2,3)
console.log("La función debe poder realizar la suma correctamente.")
if(resultTest3==5){
    console.log("Test 3 pasado")
    testPasados++
}
else{
    console.log(`Test 3 no pasado, se recibio ${resultTest3}, pero se esperaba 5`)
}

//4) La función debe poder hacer la suma con cualquier cantidad de  números.
let resultTest4=suma(1,2,3,4,5)
console.log("La función debe poder hacer la suma con cualquier cantidad de  números.")
if(resultTest4 ==15){
    console.log("Test 4 pasado")
    testPasados++;
}else{
    console.log(`Test 4 no pasado, se recibio ${resultTest4}, pero se esperaba 15`)
}

if(testPasados==testTotales){
    console.log("Todos los test se han pasado con exito")
}
else{
    console.log(`Se pasaron ${testPasados} test de un total de ${testTotales}`)
}

//Etapa 2: Hacer que las cosas pasen.(Modificar la funcion suma para verificar que los test pasen)

//Etapa 3: Refactorizar

//Aplicar TDD




