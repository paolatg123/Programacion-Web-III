import express from 'express';
import { crearCategoria, obtenerCategorias } from '../controladores/categoriaControlador.js';

const rutas = express.Router();

// GET /categorias - Obtener todas las categorías
rutas.get('/categorias', obtenerCategorias);

// POST /categorias - Crear nueva categoría
rutas.post('/categorias', crearCategoria);

export default rutas;