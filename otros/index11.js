function carnetUsuario() {
    return new Promise((resolve, reject) => {
        const ci = 15325483;
        console.log(`Este es el carnet: ${ci}`);
        resolve(ci);
    });
}

function nombreUsuario(ci) {
    return new Promise((resolve, reject) => {
        const nombre = "Paola gutierrez";
        console.log(`Su nombre es: ${nombre},usando el numero de carnet ${ci}`);
        resolve(nombre);
    });
}

carnetUsuario()
    .then(ci => {
        return nombreUsuario(ci);
    })
    .then(nombre => {
        console.log(`Se a completado. El nombre del usuario es: ${nombre}`);
    })
    .catch(error => {
        console.error("Ocurrió un error ", error);
    });