import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LibrosRecientes = () => {
    const [librosRecientes, setLibrosRecientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Obtener los libros MÁS RECIENTES de la base de datos
    useEffect(() => {
        const obtenerLibrosRecientes = async () => {
            try {
                setLoading(true);
                setError('');


                const response = await fetch('http://localhost:5000/api/productos');

                if (!response.ok) {
                    throw new Error(`Error HTTP ${response.status}`);
                }

                const data = await response.json();

                console.log('📦 Datos recibidos del backend:', data);

                if (Array.isArray(data)) {

                    const productosOrdenados = [...data]
                        .sort((a, b) => b.id - a.id)
                        .slice(0, 8);

                    const librosFormateados = productosOrdenados.map(producto => ({
                        id: producto.id,
                        titulo: producto.nombre,
                        imagen: producto.imagen_url,
                        precio: `Bs ${parseFloat(producto.precio).toFixed(2)}`,
                        categoria: producto.categoria,
                        stock: producto.stock,
                        descripcion: producto.descripcion
                    }));

                    console.log('📚 Libros recientes formateados:', librosFormateados);
                    setLibrosRecientes(librosFormateados);
                } else {
                    throw new Error('Formato de respuesta no válido');
                }

            } catch (error) {
                console.error('❌ Error obteniendo libros:', error);
                setError('Error al conectar con el servidor: ' + error.message);
                setLibrosRecientes([]);
            } finally {
                setLoading(false);
            }
        };

        obtenerLibrosRecientes();
    }, []);


    const recargarDatos = () => {
        window.location.reload();
    };


    const probarConexion = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/health');
            const data = await response.json();
            alert(`✅ Conexión exitosa!\nServidor: ${data.status}\nProyecto: ${data.proyecto}`);
        } catch (error) {
            alert(`❌ Error de conexión: ${error.message}\n\nAsegúrate de que:\n1. El servidor esté corriendo\n2. La URL sea correcta: http://localhost:5000`);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return (
            <div className="bg-orange-100 rounded-2xl shadow-2xl p-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    LIBROS MÁS RECIENTES
                </h2>
                <div className="mt-4">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
                    <p className="text-gray-600 mt-2">Consultando base de datos...</p>
                </div>
            </div>
        );
    }


    if (error) {
        return (
            <div className="bg-orange-100 rounded-2xl shadow-2xl p-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    LIBROS MÁS RECIENTES
                </h2>
                <p className="text-red-500 mb-4">{error}</p>
                <p className="text-gray-600 text-sm mb-4">
                    Asegúrate de que el servidor esté corriendo en http://localhost:5000
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <button
                        onClick={recargarDatos}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg transition duration-300"
                    >
                        Reintentar
                    </button>
                    <button
                        onClick={probarConexion}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg transition duration-300"
                    >
                        Probar Conexión
                    </button>
                    <Link to='/coleccion'>
                        <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-6 py-3 rounded-lg transition duration-300">
                            VER TODOS LOS LIBROS
                        </button>
                    </Link>
                </div>
            </div>
        );
    }


    if (librosRecientes.length === 0) {
        return (
            <div className="bg-orange-100 rounded-2xl shadow-2xl p-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    LIBROS MÁS RECIENTES
                </h2>
                <p className="text-gray-600 mb-4">
                    No se encontraron libros recientes en la base de datos
                </p>
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={recargarDatos}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg transition duration-300"
                    >
                        Reintentar
                    </button>
                    <Link to='/coleccion'>
                        <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-6 py-3 rounded-lg transition duration-300">
                            VER TODOS LOS LIBROS
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-orange-100 rounded-2xl shadow-2xl p-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    LIBROS MÁS RECIENTES
                </h2>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {librosRecientes.map(libro => (
                    <div
                        key={libro.id}
                        className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 border border-orange-200 hover:border-orange-300"
                    >
                        <div className="h-48 overflow-hidden">
                            <img
                                src={libro.imagen || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}
                                alt={libro.titulo}
                                className="w-full h-full object-cover hover:scale-105 transition duration-500"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x200?text=Sin+Imagen';
                                }}
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-gray-800 text-sm flex-1 mr-2 line-clamp-2 min-h-[2.5rem]">
                                    {libro.titulo}
                                </h3>
                                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap shrink-0">
                                    {libro.categoria}
                                </span>
                            </div>

                            {libro.descripcion && (
                                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                                    {libro.descripcion}
                                </p>
                            )}

                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-orange-600">
                                    {libro.precio}
                                </span>
                                {libro.stock !== undefined && (
                                    <span className={`text-xs px-2 py-1 rounded-full ${libro.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {libro.stock > 0 ? `Stock: ${libro.stock}` : 'Agotado'}
                                    </span>
                                )}
                            </div>

                            <Link to={`/producto/${libro.id}`}>
                                <button className="w-full mt-3 bg-danger from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2 rounded-lg transition duration-300">
                                    Ver detalles
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <Link to='/coleccion'>
                    <button className="bg-green-500 from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold px-8 py-4 rounded-xl text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        VER TODA LA COLECCIÓN
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LibrosRecientes;