"use client"; 
// Esta línea habilita el modo cliente en Next.js, asegurando que este componente se renderice en el cliente y no en el servidor.

import UserProfile from "./UserProfile"; 
// Importa el componente UserProfile, encargado de mostrar la información del usuario (por ejemplo, un avatar o nombre).

import { useNavbar } from "../../../context/NavbarContext"; 
// Importa el hook personalizado `useNavbar` del contexto `NavbarContext`. Este hook proporciona acceso al estado y las funciones relacionadas con la barra de navegación.

export default function Navbar() {
    const { title, desc } = useNavbar();
    // Utiliza el hook `useNavbar` para obtener `title` (el título principal de la página o sección) y `desc` (una breve descripción) del contexto compartido.

    return (
        <div className="flex items-center justify-between bg-white text-gray-800 shadow-md h-20 px-6">
            {/* Contenedor principal de la barra de navegación con diseño flexible, color de fondo blanco, texto en gris, sombra y espaciado horizontal */}

            {/* Sección del título y la descripción */}
            <div>
                <h1 className="text-xl font-semibold">{title}</h1>
                {/* Muestra el título con un tamaño de texto grande y un estilo de fuente seminegrita */}
                <p className="text-sm text-gray-500">{desc}</p>
                {/* Muestra la descripción con un tamaño de texto pequeño y color gris claro */}
            </div>

            {/* Icono del usuario y nombre */}
            <UserProfile />
            {/* Renderiza el componente UserProfile para mostrar la información del usuario */}
        </div>
    );
}

