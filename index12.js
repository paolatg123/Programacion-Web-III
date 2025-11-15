function obtenerNombre(callback) {
    const nombre = "Paola gutierrez";
    console.log(`1. El nombre del usuario ${nombre}`);
    callback(nombre);
}

function obtenerEdad(nombre, callback) {
    const edad = 20;
    console.log(`2. La edad del ususario ${edad}`);
    callback(edad);
}

function obtenerCarrera(edad, callback) {
    const carrera = "Informática";
    console.log(`3. La carrera de el usuario ${carrera}`);
    callback(carrera);
}

obtenerNombre((nombre) => {
    obtenerEdad(nombre, (edad) => {
        obtenerCarrera(edad, (carrera) => {
            console.log("\n--- Datos obtenidos ---");
            console.log(`Nombre: ${nombre}, Edad: ${edad}, Carrera: ${carrera}`);
        });
    });
});