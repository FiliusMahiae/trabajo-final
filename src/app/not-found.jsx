import React from 'react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-blue-800">
            <h1 className="text-6xl font-bold">404</h1>
            <h2 className="text-2xl mt-4">Página no encontrada</h2>
            <p className="mt-2 text-lg text-blue-600">¡Ups! La página que buscas no existe.</p>
            <Link
                href="/"
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                Volver al inicio
            </Link>
        </div>
    );
};

export default NotFound;