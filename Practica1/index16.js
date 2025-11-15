function nombreUsuario() {
    return new Promise((resolve) => {
        const nombre = "Paola gutierrez";
        console.log(`El nombre del usuario es: ${nombre}`);
        resolve(nombre);
    });
}

function carreraUsuario(nombre) {
    return new Promise((resolve) => {
        const carrera = "Ingeniería de Sistemas";
        console.log(`La carrera de ${nombre} es: ${carrera}`);
        resolve(carrera);
    });
}

async function datoUsuario() {
    const nombre = await nombreUsuario();
    const carrera = await carreraUsuario(nombre);
    console.log(`\nCarrera obtenida: ${carrera}`);
}
datoUsuario();