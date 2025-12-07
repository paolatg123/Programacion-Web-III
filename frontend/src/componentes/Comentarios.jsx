import React, { useState, useEffect } from 'react';
import extra2 from '../assets/extra7.gif';

import { comentarioService } from '../services/api';

const Comentarios = () => {
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    // Cargar usuario y comentarios desde la base de datos
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Cargar usuario desde localStorage
                const stored = localStorage.getItem("user");
                if (stored) {
                    setUsuario(JSON.parse(stored));
                }

                // Cargar comentarios desde la BD
                await cargarComentariosBD();
            } catch (err) {
                console.error("Error cargando datos:", err);
                // Solo muestra un mensaje de error, NO datos de ejemplo
                setComentarios([]);
                alert("No se pudieron cargar los comentarios de la base de datos");
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, []);

    // Función para cargar comentarios desde la base de datos
    const cargarComentariosBD = async () => {
        try {
            // Si tu endpoint espera productoId, envía 1 para comentarios generales
            const productoId = 1;

            // Intenta obtener comentarios por producto
            const comentariosBD = await comentarioService.getByProducto(productoId);

            // Si esa ruta no funciona, intenta obtener todos los comentarios
            if (!comentariosBD || comentariosBD.length === 0) {
                const todosComentarios = await comentarioService.getAll();
                setComentarios(formatComentarios(todosComentarios));
            } else {
                setComentarios(formatComentarios(comentariosBD));
            }

        } catch (error) {
            console.error("Error cargando comentarios desde BD:", error);
            throw error;
        }
    };

    // Función para formatear comentarios
    const formatComentarios = (comentariosBD) => {
        return comentariosBD.map(comentario => ({
            id: comentario.id,
            nombre: comentario.nombre_usuario || comentario.username || "Usuario",
            comentario: comentario.comentario,
            fecha: new Date(comentario.created_at).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
        }));
    };

    // Enviar comentario
    const enviarComentario = async () => {
        if (!nuevoComentario.trim()) {
            alert("Por favor, escribe un comentario");
            return;
        }

        const nombreUsuario = usuario?.username || "Usuario";

        try {
            // Datos para guardar en la BD (incluyendo productoId si es necesario)
            const comentarioData = {
                productoId: 1, // IMPORTANTE: tu endpoint lo necesita
                comentario: nuevoComentario,
                usuarioId: usuario?.id || null
            };

            // Guardar en la BD
            const comentarioGuardado = await comentarioService.create(comentarioData);

            // Crear comentario para mostrar
            const comentario = {
                id: comentarioGuardado.id || Date.now(),
                nombre: nombreUsuario,
                comentario: nuevoComentario,
                fecha: new Date().toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                }),
            };

            // Agregar al principio de la lista
            setComentarios([comentario, ...comentarios]);
            setNuevoComentario("");
            alert("Comentario guardado");

        } catch (error) {
            console.error("Error guardando comentario:", error);
            alert("Error al guardar el comentario en la base de datos");
        }
    };

    // Manejar Enter para enviar
    const manejarTeclaEnter = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            enviarComentario();
        }
    };

    // Función para depuración: ver qué datos estamos recibiendo
    const debugComentarios = () => {
        console.log("Comentarios actuales:", comentarios);
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-2xl h-full flex flex-col w-100 border border-gray-900">
                <div className="bg-orange-500 text-white rounded-t-2xl px-6 py-4">
                    <h3 className="text-xl font-bold p-2 text-center">¿Qué opinas?</h3>

                </div>
                <div className="p-9 flex items-center justify-center">
                    <p className="text-gray-500">Cargando comentarios de la base de datos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-2xl h-full flex flex-col w-100 border border-gray-900 border-black">
            <div className="bg-orange-500 text-white rounded-t-2xl px-6 py-4">
                <h3 className="text-xl font-bold p-1 text-center">¿Qué opinas?</h3>
                <div className='flex justify-center items-center'>
                    <img src={extra2} alt="" className="w-15" />
                </div>
            </div>

            {/* Botón de depuración (opcional, elimina después) */}
            <button
                onClick={debugComentarios}
                className="hidden bg-blue-500 text-white p-2 text-xs"
            >
                Debug
            </button>

            <div className="p-4 h-20 overflow-y-auto flex-grow">
                {comentarios.length === 0 ? (
                    <p className="text-gray-500 text-center">
                        No hay comentarios en la base de datos. ¡Sé el primero en comentar!
                    </p>
                ) : (
                    comentarios.map(comentario => (
                        <div key={comentario.id} className="mb-4 last:mb-0">
                            <div className="bg-orange-100 rounded-lg p-1 border-l-4 border-orange-400">
                                <h4 className="font-semibold text-gray-800 text-sm">
                                    {comentario.nombre}
                                </h4>

                                <p className="text-gray-600 text-sm mb-1">
                                    {comentario.comentario}
                                </p>
                                <span className="text-xs text-gray-400 block text-right">
                                    {comentario.fecha}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="px-4 pb-2  mt-auto">
                <div className="bg-white border border-slate-200 grid grid-cols-6 gap-2 rounded-xl p-2 text-sm">
                    <h1 className="text-center text-slate-600 text-xl font-bold col-span-6">
                        DEJA TU COMENTARIO
                    </h1>

                    <textarea
                        placeholder="Escribe tu comentario..."
                        value={nuevoComentario}
                        onChange={(e) => setNuevoComentario(e.target.value)}
                        onKeyDown={manejarTeclaEnter}
                        className="bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300"
                    ></textarea>

                    <button
                        onClick={enviarComentario}
                        className="bg-slate-100 stroke-slate-600 border border-slate-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600"
                    >
                        <svg fill="none" viewBox="0 0 24 24" height="30px" width="30px">
                            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5"
                                d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"></path>
                            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5"
                                d="M10.11 13.6501L13.69 10.0601"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Comentarios;