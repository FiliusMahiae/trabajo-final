"use client";
// Habilita el modo cliente para que este componente funcione en el navegador.

import Link from 'next/link';
// Importa `Link` de Next.js para manejar la navegación con optimización interna.

import Image from 'next/image';
// Importa `Image` de Next.js para imágenes optimizadas.

export default function SidebarItem({ title, icon, href }) {
  // Componente que representa un elemento del menú lateral.

  return (
    <Link href={href}>
      {/* Enlace que redirige al valor especificado en `href`. */}
      <div className="flex items-center p-3 my-3 hover:bg-gray-200 hover:shadow-sm rounded-md transition-colors duration-200">
        {/* Contenedor con diseño flexible, estilos y animación de transición al interactuar */}
        <Image
          src={icon}
          alt={`${title} icon`}
          width={24}
          height={24}
          className="w-6 h-6 mr-3 text-gray-600"
        />
        {/* Icono asociado al elemento del menú, optimizado y con espaciado */}
        <span className="text-gray-800 font-medium">{title}</span>
        {/* Título del elemento del menú con estilo destacado */}
      </div>
    </Link>
  );
}
