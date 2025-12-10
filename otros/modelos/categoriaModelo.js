import { db } from '../config/db.js';

export const obtTodasCategorias = async () => {
    const [resultado] = await db.query('SELECT * FROM categorias ORDER BY fecha_alta DESC');
    return resultado;
};

export const insertaCategoria = async (categoria) => {
    const { nombre, descripcion } = categoria;
    const [resultado] = await db.query(
        'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion]
    );
    return { id: resultado.insertId, nombre, descripcion };
};

export const obtCategoriaPorId = async (id) => {
    const [categorias] = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);

    if (categorias.length === 0) return null;

    const categoria = categorias[0];
    const [productos] = await db.query(
        'SELECT * FROM productos WHERE categoria_id = ?',
        [id]
    );

    return {
        ...categoria,
        productos: productos
    };
};

export const actualizaCategoria = async (id, categoria) => {
    const { nombre, descripcion } = categoria;
    const [resultado] = await db.query(
        'UPDATE categorias SET nombre = ?, descripcion = ?, fecha_act = NOW() WHERE id = ?',
        [nombre, descripcion, id]
    );
    return resultado.affectedRows > 0;
};

export const eliminaCategoria = async (id) => {
    const [resultado] = await db.query('DELETE FROM categorias WHERE id = ?', [id]);
    return resultado.affectedRows > 0;
};