function obtenerNombre() {
    return new Promise((resolve) => {
        const nombre = "Paola gutierrez";
        console.log(`1. El nombre del usuario ${nombre}`);
        resolve(nombre);
    });
}

function obtenerEdad() {
    return new Promise((resolve) => {
        const edad = 20;
        console.log(`2. La edad del ususario ${edad}`);
        resolve(edad);
    });
}

function obtenerCarrera() {
    return new Promise((resolve) => {
        const carrera = "Informática";
        console.log(`3. La carrera de el usuario ${carrera}`);
        resolve(carrera);
    });
}

async function datoUsusario() {
    const nombre = await obtenerNombre();
    const edad = await obtenerEdad();
    const carrera = await obtenerCarrera();

    console.log("\n--- Datos obtenidos ---");
    console.log(`Nombre: ${nombre}, Edad: ${edad}, Carrera: ${carrera}`);
}

datoUsusario();