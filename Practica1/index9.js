const tiempo = 3000;

const miPromesa = new Promise((resolve) => {
    setTimeout(() => {
        resolve("se cumplio la promesa");
    }, tiempo);
});

miPromesa.then((promesa) => {
    console.log(promesa);
});