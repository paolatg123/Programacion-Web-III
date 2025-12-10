import { db } from '../config/db.js';

export const obtTodo = async () => {
    const [resultado] = await db.query(`
        SELECT p.*, c.nombre as categoria_nombre 
        FROM productos p 
        INNER JOIN categorias c ON p.categoria_id = c.id 
        ORDER BY p.fecha_alta DESC
    `);
    return resultado;
};

export const obtPorId = async (id) => {
    const [resultado] = await db.query(`
        SELECT p.*, c.nombre as categoria_nombre 
        FROM productos p 
        INNER JOIN categorias c ON p.categoria_id = c.id 
        WHERE p.id = ?
    `, [id]);
    return resultado[0];
};

export const inserta = async (producto) => {
    const { nombre, precio, stock, categoria_id } = producto;
    const [resultado] = await db.query(
        'INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)',
        [nombre, precio, stock, categoria_id]
    );
    return { id: resultado.insertId, ...producto };
};

export const actualiza = async (id, producto) => {
    const { nombre, precio, stock, categoria_id } = producto;
    const [resultado] = await db.query(
        'UPDATE productos SET nombre = ?, precio = ?, stock = ?, categoria_id = ?, fecha_act = NOW() WHERE id = ?',
        [nombre, precio, stock, categoria_id, id]
    );
    return resultado.affectedRows > 0;
};

export const actualizaStock = async (id, cantidad) => {
    const [resultado] = await db.query(
        'UPDATE productos SET stock = stock + ?, fecha_act = NOW() WHERE id = ?',
        [cantidad, id]
    );
    return resultado.affectedRows > 0;
};

export const elimina = async (id) => {
    await db.query('DELETE FROM productos WHERE id = ?', [id]);
    return id;
};