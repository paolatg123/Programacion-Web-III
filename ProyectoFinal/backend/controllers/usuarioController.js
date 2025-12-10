
const Usuario = require('../models/usuario');

const usuarioController = {
    getPerfil: async (req, res) => {
        try {

            const usuario = await Usuario.findById(req.user.id);

            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            const { password, ...usuarioSinPassword } = usuario;

            res.status(200).json({
                success: true,
                data: usuarioSinPassword
            });
        } catch (error) {
            console.error('Error al obtener perfil:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener perfil del usuario'
            });
        }
    },


    actualizarPerfil: async (req, res) => {
        try {
            const { nombre, email } = req.body;


            if (!nombre || !email) {
                return res.status(400).json({
                    success: false,
                    message: 'Nombre y email son requeridos'
                });
            }


            const usuarioActualizado = await Usuario.actualizar(req.user.id, {
                nombre,
                email
            });

            res.status(200).json({
                success: true,
                message: 'Perfil actualizado correctamente',
                data: usuarioActualizado
            });
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            res.status(500).json({
                success: false,
                message: 'Error al actualizar perfil'
            });
        }
    },


    getAllUsuarios: async (req, res) => {
        try {

            if (req.user.rol !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'No autorizado. Se requiere rol de administrador'
                });
            }

            const usuarios = await Usuario.findAll();


            const usuariosSinPassword = usuarios.map(usuario => {
                const { password, ...rest } = usuario;
                return rest;
            });

            res.status(200).json({
                success: true,
                count: usuariosSinPassword.length,
                data: usuariosSinPassword
            });
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener usuarios'
            });
        }
    },


    eliminarUsuario: async (req, res) => {
        try {
            const { id } = req.params;


            if (req.user.id !== parseInt(id) && req.user.rol !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'No autorizado para eliminar este usuario'
                });
            }

            const eliminado = await Usuario.eliminar(id);

            if (!eliminado) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Usuario eliminado correctamente'
            });
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({
                success: false,
                message: 'Error al eliminar usuario'
            });
        }
    }
};

module.exports = usuarioController;