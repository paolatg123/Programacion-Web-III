function obtenerNombre() {
    return new Promise((resolve) => {
        const nombre = "Paola gutierrez";
        console.log(`El nombre del usuario es: ${nombre}`);
        resolve(nombre);
    });
}

function obtenerCarrera(nombre) {
    return new Promise((resolve) => {
        const carrera = "Ingeniería de Sistemas";
        console.log(`La carrera de ${nombre} es: ${carrera}`);
        resolve(carrera);
    });
}

obtenerNombre()
    .then((nombre) => {
        return obtenerCarrera(nombre);
    })
    .then((carrera) => {
        console.log(`\nCarrera obtenida: ${carrera}`);
    });