
function contarVocales(texto) {
    const contar = { a: 0, e: 0, i: 0, o: 0, u: 0 };

    for (let vocal of texto) {
        if (vocal in contar) {
            contar[vocal]++;
        }
    }

    return contar;
}

let obj = contarVocales("euforia");
console.log(obj); 