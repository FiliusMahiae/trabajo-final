"use client";
// Habilita el modo cliente para que este componente funcione en el navegador.

import { useEffect, useState } from 'react';
// Importa hooks de React para manejar estado y efectos secundarios.

import getCookie from "@/components/Auth/getCookie";
// Función para obtener el token de autenticación desde las cookies.

import { useRouter } from 'next/navigation';
// Hook de Next.js para manejar la navegación programática.

import deleteCookie from "@/components/Auth/deleteCookie";
// Función para eliminar cookies.

import Link from 'next/link';
// Componente de Next.js para navegación interna.

export default function UserProfile() {
    // Componente `UserProfile` que muestra información del usuario y un menú desplegable.

    const [userName, setUserName] = useState('');
    // Estado para almacenar el nombre del usuario.

    const [menuOpen, setMenuOpen] = useState(false);
    // Estado para controlar si el menú desplegable está abierto.

    const [profileImage, setProfileImage] = useState("/userProfile.png");
    // Estado para la imagen de perfil del usuario.

    const router = useRouter();
    // Hook para manejar la navegación.

    useEffect(() => {
        const token = getCookie('jwt');
        // Obtiene el token JWT desde las cookies.

        if (token) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const data = await response.json();
                    // Obtiene los datos del usuario desde la API.
                    
                    const { name } = data;
                    setUserName(name);
                    setProfileImage(data.logo || "/userProfile.png");
                    // Actualiza el estado con el nombre y la imagen del usuario.
                } catch (error) {
                    console.log('Error fetching user data:', error);
                }
            };
            fetchUserData();
            // Llama a la función para obtener los datos del usuario.
        }
    }, []);

    const handleLogout = () => {
        deleteCookie('jwt');
        // Elimina la cookie JWT.

        router.push('/login');
        // Redirige al usuario a la página de inicio de sesión.
    };

    return (
        <div className="relative">
            {/* Contenedor principal del perfil del usuario. */}

            <div
                className="flex items-center cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
                // Alterna el estado del menú al hacer clic.
            >
                <img
                    src={profileImage}
                    alt="User Icon"
                    className="w-10 h-10 rounded-full mr-2"
                    // Muestra la imagen de perfil redondeada.
                />
                <span className="font-medium">{userName}</span>
                {/* Muestra el nombre del usuario. */}
            </div>

            {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                    {/* Menú desplegable con opciones. */}
                    <div className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-all duration-300">
                        <Link href="/dashboard/user">
                            Perfil
                        </Link>
                        {/* Enlace a la página de perfil del usuario. */}
                    </div>
                    <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-all duration-300"
                        onClick={handleLogout}
                        // Botón para cerrar sesión.
                    >
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
}