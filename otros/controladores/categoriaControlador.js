import {
    obtTodasCategorias,
    insertaCategoria,
    obtCategoriaPorId,
    actualizaCategoria,
    eliminaCategoria
} from '../modelos/categoriaModelo.js';

export const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await obtTodasCategorias();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre) {
            return res.status(400).json({ error: 'El campo nombre es requerido' });
        }

        const resultado = await insertaCategoria({ nombre, descripcion });
        res.status(201).json({
            mensaje: 'Categoría creada exitosamente',
            categoria: resultado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerCategoriaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await obtCategoriaPorId(id);

        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.json(categoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        if (!nombre) {
            return res.status(400).json({ error: 'El campo nombre es requerido' });
        }

        const actualizado = await actualizaCategoria(id, { nombre, descripcion });

        if (!actualizado) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.json({ mensaje: 'Categoría actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await eliminaCategoria(id);

        if (!eliminado) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.json({ mensaje: 'Categoría y sus productos eliminados correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};