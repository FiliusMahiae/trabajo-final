"use client";
// Habilita el modo cliente para que el componente se renderice en el navegador.

import SidebarItem from "./SidebarItem";
// Importa el componente SidebarItem para representar cada elemento del menú lateral.

import Image from 'next/image';
// Importa el componente `Image` de Next.js para manejar imágenes optimizadas.

export default function Sidebar() {
    return (
        <div className="h-screen bg-gray-50 p-4 border-r border-gray-200 shadow-lg">
            {/* Contenedor principal del sidebar con estilos para ocupar toda la altura y separarlo visualmente */}
            
            <div className="flex justify-center mb-8">
                <Image 
                    src="/logo.png" 
                    alt="Empresa Logo" 
                    width={100} 
                    height={100} 
                    className="rounded-full shadow-md" 
                />
                {/* Logo de la empresa centrado, redondeado y con sombra */}
            </div>
            
            <div className="border-t border-gray-300 pt-4">
                {/* División para el menú con un borde superior para separar visualmente */}
                
                <p className="text-gray-700 font-semibold text-lg tracking-wide mb-4">MENÚ</p>
                {/* Título del menú con estilo destacado */}
                
                <div className="space-y-2">
                    {/* Lista de elementos del menú con espaciado vertical */}
                    
                    <SidebarItem
                        title="Clientes"
                        icon="/icons/clients.svg"
                        href="/dashboard/clients"
                    />
                    {/* Cada SidebarItem representa un enlace del menú con un título, ícono y URL */}
                    
                    <SidebarItem
                        title="Añadir Cliente"
                        icon="/icons/create-client.svg"
                        href="/dashboard/create-client"
                    />
                    <SidebarItem
                        title="Proyectos"
                        icon="/icons/projects.svg"
                        href="/dashboard/projects"
                    />
                    <SidebarItem
                        title="Crear Proyecto"
                        icon="/icons/create-project.svg"
                        href="/dashboard/create-project"
                    />
                    <SidebarItem
                        title="Albaranes"
                        icon="/icons/albaranes.svg"
                        href="/dashboard/albaranes"
                    />
                </div>
            </div>
        </div>
    );
}

