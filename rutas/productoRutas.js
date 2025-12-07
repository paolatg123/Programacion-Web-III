import express from 'express';
import {
    muestraProductos,
    muestraProductoPorId,
    insertaProducto,
    actualizaProducto,
    actualizarStock,
    eliminaProducto,
    crearProducto
} from '../controladores/productoControlador.js';
import {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId,
    actualizarCategoria,
    eliminarCategoria
} from '../controladores/categoriaControlador.js';

const rutas = express.Router();

rutas.get('/productos', muestraProductos);
rutas.get('/productos/:id', muestraProductoPorId);
rutas.post('/productos', crearProducto);
rutas.put('/productos/:id', actualizaProducto);
rutas.patch('/productos/:id/stock', actualizarStock);
rutas.delete('/productos/:id', eliminaProducto);

rutas.get('/categorias', obtenerCategorias);
rutas.post('/categorias', crearCategoria);
rutas.get('/categorias/:id', obtenerCategoriaPorId);
rutas.put('/categorias/:id', actualizarCategoria);
rutas.delete('/categorias/:id', eliminarCategoria);

export default rutas;