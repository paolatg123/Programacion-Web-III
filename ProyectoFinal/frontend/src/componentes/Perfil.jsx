import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaTimes } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import extra1 from '../assets/extra9.gif';

const Perfil = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: "Usuario",
        email: ""
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = 'hidden';
            cargarDatos();
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const cargarDatos = () => {
        try {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                const parsedUser = JSON.parse(savedUser);
                setUserData({
                    name: parsedUser.username || "Usuario",
                    email: parsedUser.email || ""
                });
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        onClose();
        alert("Sesión cerrada");
        setTimeout(() => navigate('/login'), 500);
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div ref={modalRef} className="w-full max-w-md">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:text-gray-200 z-10"
                        style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
                    >
                        <FaTimes />
                    </button>

                    <div className="min-h-screen py-10 px-8 sm:px-6 lg:px-8 flex items-center justify-center">
                        <div className="max-w-md mx-auto w-150 h-100 bg-orange-300 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                            <div className="p-8">
                                <div className="flex flex-col items-center">

                                    <div className="relative">
                                        <img
                                            src={extra1}
                                            alt="Perfil animado"
                                            className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
                                            onError={(e) => {
                                                console.log("Error cargando GIF, usando ícono");
                                                e.target.style.display = 'none';
                                                const fallback = document.getElementById('fallback-icon');
                                                if (fallback) fallback.style.display = 'block';
                                            }}
                                        />
                                        <FaUserCircle
                                            className="w-32 h-32 text-orange-500 absolute top-0 left-0"
                                            style={{ display: 'none' }}
                                            id="fallback-icon"
                                        />
                                    </div>

                                    <div className="mt-4 text-center">
                                        <div className="mb-1">
                                            <label className="text-sm text-gray-700 font-medium">USUARIO</label>
                                        </div>
                                        <h1 className="text-2xl font-bold text-gray-900 px-3 py-1 bg-white bg-opacity-30 rounded-lg">
                                            {userData.name}
                                        </h1>
                                    </div>

                                    <div className="mt-2 text-center">
                                        <div className="mb-1">
                                            <label className="text-sm text-gray-700 font-medium">CORREO</label>
                                        </div>
                                        <p className="text-gray-800 font-medium px-3 py-1 bg-white bg-opacity-30 rounded-lg">
                                            {userData.email || "No especificado"}
                                        </p>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                                            onClick={handleLogout}
                                        >
                                            <RiLogoutBoxLine className="w-5 h-5" />
                                            CERRAR SESIÓN
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Perfil;