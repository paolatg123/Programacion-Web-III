function obtenerNombre() {
    return new Promise((resolve) => {
        const nombre = "Paola gutierrez";
        console.log(`El nombre del usuario ${nombre}`);
        resolve(nombre);
    });
}

function nombreCallback(callback) {
    obtenerNombre().then((nombre) => {
        callback(nombre);
    });
}

nombreCallback((nombre) => {
    console.log(`Operación completada. El nombre del usuario es: ${nombre}`);
});