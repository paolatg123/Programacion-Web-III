const tiempo = 2000;

function Callback() {
    console.log("Ejecutada despues de 2 segundos");
}
setTimeout(Callback, tiempo);