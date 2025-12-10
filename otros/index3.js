function miFuncion(arreglo) {
    let pares = [];
    let impares = [];
    let i = 0;
    let j = 0;
    for (let num of arreglo) {
        if (num % 2 === 0) {
            pares[i] = num;
            i++;
        } else {
            impares[j] = num;
            j++;
        }
    }
    return { pares: pares, impares: impares };
}

let obj = miFuncion([1, 2, 3, 4, 5]);
console.log(obj); 
