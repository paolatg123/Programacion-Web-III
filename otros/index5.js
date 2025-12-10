function miFuncion(cadena) {
    const letras = cadena.length;
    for (let i = 0; i < letras / 2; i++) {
        if (cadena[i] !== cadena[letras - 1 - i]) {
            return false;
        }
    }
    return true;
}

let palindromo = miFuncion("oruro");
console.log(palindromo);

let band = miFuncion("hola");
console.log(band);  
