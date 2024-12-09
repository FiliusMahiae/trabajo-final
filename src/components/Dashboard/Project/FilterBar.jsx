"use client";
// Habilita el modo cliente para que el componente funcione en el navegador.

export default function FilterBar({ register, handleSubmit }) {
    // Componente `FilterBar` que implementa un formulario para filtrar datos.
    // Recibe `register` (de React Hook Form) para registrar los campos y `handleSubmit` para manejar el envío.

    return (
        <form 
            onSubmit={handleSubmit} 
            className="mb-4 p-4 bg-white shadow-md rounded-lg"
            // Formulario con diseño de tarjeta, sombra y bordes redondeados.
        >
            <div className="flex space-x-4">
                {/* Contenedor con diseño flexible y separación horizontal entre los campos. */}

                <input
                    {...register('name')}
                    type="text"
                    placeholder="Filtrar por nombre"
                    className="w-1/3 p-2 border border-gray-300 rounded-md shadow-sm"
                    // Campo de texto para filtrar por nombre con estilo responsivo y sombreado.
                />
                <input
                    {...register('email')}
                    type="text"
                    placeholder="Filtrar por email"
                    className="w-1/3 p-2 border border-gray-300 rounded-md shadow-sm"
                    // Campo de texto para filtrar por email.
                />
                <input
                    {...register('startDate')}
                    type="date"
                    placeholder="Fecha de inicio"
                    className="w-1/3 p-2 border border-gray-300 rounded-md shadow-sm"
                    // Campo de selección de fecha para filtrar desde una fecha inicial.
                />
                <input
                    {...register('endDate')}
                    type="date"
                    placeholder="Fecha de fin"
                    className="w-1/3 p-2 border border-gray-300 rounded-md shadow-sm"
                    // Campo de selección de fecha para filtrar hasta una fecha final.
                />
                <button 
                    type="submit" 
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 shadow-md transition-all duration-300"
                    // Botón para enviar el formulario con estilos interactivos y transiciones.
                >
                    Buscar
                </button>
            </div>
        </form>
    );
}