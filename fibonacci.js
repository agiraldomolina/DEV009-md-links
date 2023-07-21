const fibonacci=(n)=>{
    if (n<0){
        throw new Error ('n debe ser mayor o igual a cero')
    }
    return n === 1 || n=== 0 ?n: fibonacci(n-1)+ fibonacci(n-2)
};

console.log(fibonacci(6));
