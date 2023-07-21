const factorial =(n)=>{
    if (n < 1){
        throw new Error ("n debe ser un entero postivo")
    }else{
        if (n===1){
            return 1
        }else{
            return n*factorial(n-1)
        }
    }
}

console.log(factorial(0));