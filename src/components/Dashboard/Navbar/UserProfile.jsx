"use client";

import { useEffect, useState } from 'react';
import getCookie from "@/components/Auth/getCookie";
import { useRouter } from 'next/navigation';
import deleteCookie from "@/components/Auth/deleteCookie"; // Función para eliminar cookies

export default function UserProfile() {
    const [userName, setUserName] = useState('');
    const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar si el menú está abierto
    const router = useRouter();

    useEffect(() => {
        const token = getCookie('jwt');
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
                    const { name } = data;
                    setUserName(name);
                } catch (error) {
                    console.log('Error fetching user data:', error);
                }
            };
            fetchUserData();
        }
    }, []);

    const handleLogout = () => {
        deleteCookie('jwt'); // Elimina la cookie JWT
        router.push('/login'); // Redirige a la página de inicio de sesión
    };

    return (
        <div className="relative">
            <div
                className="flex items-center cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)} // Cambia el estado del menú al hacer clic
            >
                <img
                    src="/userProfile.png"
                    alt="User Icon"
                    className="w-10 h-10 rounded-full mr-2"
                />
                <span className="font-medium">{userName}</span>
            </div>

            {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                    <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
}

