import React from 'react';
import Link from 'next/link';
// Importa React y el componente `Link` para manejar la navegación interna.

const NotFound = () => {
    // Componente `NotFound` que muestra un mensaje de error 404.

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-blue-800">
            {/* Contenedor principal:
                - `flex flex-col`: Diseñado en columna.
                - `items-center justify-center`: Centrado vertical y horizontalmente.
                - `min-h-screen`: Ocupa toda la altura de la pantalla.
                - `bg-blue-50 text-blue-800`: Fondo azul claro y texto azul oscuro. */}
            
            <h1 className="text-6xl font-bold">404</h1>
            {/* Título grande para indicar el error. */}

            <h2 className="text-2xl mt-4">Página no encontrada</h2>
            {/* Subtítulo informativo. */}

            <p className="mt-2 text-lg text-blue-600">¡Ups! La página que buscas no existe.</p>
            {/* Mensaje adicional con estilo complementario. */}

            <Link
                href="/"
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                // Botón estilizado para regresar a la página principal.
            >
                Volver al inicio
            </Link>
        </div>
    );
};

export default NotFound;
