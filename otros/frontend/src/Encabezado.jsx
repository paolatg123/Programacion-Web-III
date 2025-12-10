import React, { useState, useEffect } from 'react';
import { CiLinkedin } from "react-icons/ci";
import { SiGithub } from "react-icons/si";
import logo1 from './assets/Principal.png';
import { FaCircleUser } from "react-icons/fa6";
import { Link, Outlet } from 'react-router-dom';
import { FaReact } from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import PerfilModal from './componentes/Perfil'; // Asegúrate de importar el componente modal

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

const Encabezado = (args) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    // Verificar si el usuario está autenticado
    useEffect(() => {
        const checkAuth = () => {
            const user = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!(user && token));
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    // Manejar clic en el botón de cuenta
    const handleClick = (e) => {
        if (isAuthenticated) {
            e.preventDefault(); // Prevenir navegación
            setShowProfileModal(true);
        }
        // Si no está autenticado, el Link redirigirá a /login normalmente
    };

    return (
        <div>
            <Navbar {...args} expand="md" style={{
                height: 'auto',
                backgroundColor: 'orange',
                padding: '0.2rem 0'
            }}>
                <NavbarBrand href="/">
                    <img src={logo1} alt="Logo" style={{ height: '69px', width: '250' }} />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />

                <div>
                    <Navbar {...args} expand="md" style={{ backgroundColor: 'white' }}>
                        <Nav className="me-auto" navbar style={{ display: 'flex', alignItems: 'center' }}>
                            <NavItem>
                                <Link to="/" style={{ cursor: 'pointer', color: 'black', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none', padding: '8px 16px' }}>
                                    INICIO
                                </Link>
                            </NavItem>
                            <NavItem>
                                <a
                                    href="https://github.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block"
                                >
                                    <SiGithub size={50} className="text-2xl mr-4 cursor-pointer text-orange-500 hover:text-orange-600" />
                                </a>
                            </NavItem>
                            <NavItem>
                                <a
                                    href="https://www.linkedin.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block"
                                >
                                    <CiLinkedin size={50} className="text-2xl mr-4 cursor-pointer text-orange-500 hover:text-orange-600" />
                                </a>
                            </NavItem>
                            <NavItem>
                                <a
                                    href="www.mysql.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block"
                                >
                                    <SiMysql size={50} className="text-2xl mr-4 cursor-pointer text-orange-500 hover:text-orange-600" />
                                </a>
                            </NavItem>
                            <NavItem>
                                <a
                                    href="https://react.dev/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block"
                                >
                                    <FaReact size={50} className="text-2xl cursor-pointer text-orange-500 hover:text-orange-600" />
                                </a>
                            </NavItem>
                        </Nav>

                        <NavbarToggler onClick={toggle} />
                        <Collapse isOpen={isOpen} navbar>
                        </Collapse>

                        <Nav navbar className="ms-auto" style={{ display: 'flex', alignItems: 'center' }}>
                        </Nav>
                    </Navbar>
                </div>

                <Nav navbar className="ms-auto" style={{ display: 'flex', alignItems: 'center' }}>
                    <NavItem>
                        <Link to="/productos" className="text-decoration-none">
                            <button
                                className="btn btn-warning d-flex align-items-center gap-1 px-5 py-3 fw-bold bg-danger m-1"
                            >
                                PRODUCTOS
                            </button>
                        </Link>
                    </NavItem>

                    {/* BOTÓN DE CUENTA */}
                    <NavItem className='p-5 btn-warning'>
                        <Link
                            to={isAuthenticated ? "#" : "/login"}
                            className="text-decoration-none"
                            onClick={handleClick}
                        >
                            <button
                                className="btn align-items-center gap-1 px-4 py-1 fw-bold"
                                style={{
                                    backgroundColor: isAuthenticated ? '#f97316' : '#fbbf24',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <FaCircleUser size={24} />
                                {isAuthenticated ? 'Mi Cuenta' : 'Iniciar Sesión'}

                                {/* Indicador de sesión activa */}
                                {isAuthenticated && (
                                    <span
                                        className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle"
                                        style={{
                                            width: '10px',
                                            height: '10px'
                                        }}
                                    >
                                        <span className="visually-hidden">Sesión activa</span>
                                    </span>
                                )}
                            </button>
                        </Link>
                    </NavItem>
                </Nav>
            </Navbar>

            {/* Modal del perfil (fuera del Navbar) */}
            <PerfilModal
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
            />

            {/* Renderizar las rutas hijas */}
            <Outlet />
        </div>
    );
};

export default Encabezado;