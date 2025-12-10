import { obtTodo, obtPorId, inserta, actualiza, actualizaStock, elimina } from '../modelos/productoModelo.js';

export const muestraProductos = async (req, res) => {
    try {
        const resultado = await obtTodo();
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const muestraProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await obtPorId(id);

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const insertaProducto = async (req, res) => {
    try {
        const resultado = await inserta(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizaProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock, categoria_id } = req.body;

        if (!nombre || !precio || !stock || !categoria_id) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const actualizado = await actualiza(id, { nombre, precio, stock, categoria_id });

        if (!actualizado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ mensaje: 'Producto actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;

        if (cantidad === undefined || cantidad === null) {
            return res.status(400).json({ error: 'La cantidad es requerida' });
        }

        const actualizado = await actualizaStock(id, cantidad);

        if (!actualizado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ mensaje: 'Stock actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminaProducto = async (req, res) => {
    try {
        await elimina(req.params.id);
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const crearProducto = async (req, res) => {
    try {
        const { nombre, precio, stock, categoria_id } = req.body;

        if (!nombre || !precio || !stock || !categoria_id) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const resultado = await inserta({ nombre, precio, stock, categoria_id });
        res.status(201).json({
            mensaje: 'Producto creado exitosamente',
            producto: resultado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};