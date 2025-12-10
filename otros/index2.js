function miFuncion(cadena) {
    let invertir = '';
    for (let i = cadena.length - 1; i >= 0; i--) {
        invertir = invertir + cadena[i];
    }
    return invertir;
}

let letras = miFuncion("abcd");
console.log(letras); 