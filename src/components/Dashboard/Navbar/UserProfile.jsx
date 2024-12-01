"use client";

import { useEffect, useState } from 'react';  // Importa hooks de React para manejar estado y efectos secundarios
import getCookie from "@/components/Auth/getCookie";

export default function UserProfile() {
    const [userName, setUserName] = useState('');  // Estado local para almacenar el nombre del usuario

    useEffect(() => {
        // Obtiene el token JWT almacenado en Cookies
        const token = getCookie('jwt');
        if (token) {
            // Función asíncrona para obtener los datos del usuario desde la API
            const fetchUserData = async () => {
                try {
                    const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user', {
                        method: 'GET',  // Método GET para obtener datos del usuario
                        headers: {
                            'Content-Type': 'application/json',  // Especifica JSON como el tipo de contenido
                            'Authorization': `Bearer ${token}`  // Incluye el token JWT para autenticación
                        }
                    });
                    const data = await response.json();  // Convierte la respuesta en un objeto JSON
                    const { name } = data;  // Extrae el nombre del usuario de la respuesta
                    setUserName(name);  // Actualiza el estado con el nombre del usuario
                } catch (error) {
                    // Manejo de errores en caso de que falle la solicitud a la API
                    console.log('Error fetching user data:', error);
                }
            };
            fetchUserData();  // Llama a la función para obtener los datos del usuario
        }
    }, []);  // El efecto solo se ejecuta una vez cuando el componente se monta

    return (
        <div className="flex items-center">
            {/* Icono de usuario */}
            <img
                src="/userProfile.png"  // Ruta de la imagen del perfil
                alt="User Icon"
                className="w-10 h-10 rounded-full mr-2"  // Estilos para el tamaño y bordes redondeados
            />
            {/* Nombre del usuario */}
            <span className="font-medium">{userName}</span>
        </div>
    );
}

