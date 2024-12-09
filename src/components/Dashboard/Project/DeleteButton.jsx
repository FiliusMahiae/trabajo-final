"use client";
// Habilita el modo cliente para que este componente funcione en el navegador.

import React from "react";
// Importa React para el uso de JSX.

import getCookie from "@/components/Auth/getCookie";
// Importa `getCookie` para recuperar el token de autenticación de las cookies.

export default function DeleteButton({ itemId, deleteUrl, onDelete, confirmMessage = "¿Estás seguro de que deseas eliminar este elemento?" }) {
    // Componente `DeleteButton` que proporciona un botón para eliminar elementos.
    // Recibe:
    // - `itemId`: Identificador del elemento a eliminar.
    // - `deleteUrl`: URL de la API con formato que incluye "{id}" para reemplazar.
    // - `onDelete`: Función que se ejecuta después de una eliminación exitosa.
    // - `confirmMessage`: Mensaje de confirmación antes de eliminar (por defecto, un mensaje genérico).

    const handleDelete = async () => {
        if (!itemId) return;
        // Si no hay `itemId`, no realiza ninguna acción.

        const confirmDelete = window.confirm(confirmMessage);
        // Muestra una ventana de confirmación antes de proceder.

        if (!confirmDelete) return;
        // Si el usuario cancela, termina la ejecución.

        const token = getCookie('jwt');
        // Obtiene el token de autenticación.

        if (!token) {
            console.error("Token de autenticación no encontrado");
            return;
            // Muestra un error en la consola si el token no existe.
        }

        try {
            const response = await fetch(deleteUrl.replace("{id}", itemId), {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                // Realiza la solicitud DELETE reemplazando `{id}` en la URL con el identificador del elemento.
            });

            if (response.ok) {
                onDelete && onDelete(itemId);
                // Llama a la función `onDelete` si está definida y la solicitud fue exitosa.
            } else {
                alert("No se pudo eliminar el elemento. Inténtalo de nuevo más tarde.");
                // Muestra un mensaje de error si la solicitud no es exitosa.
            }
        } catch (error) {
            console.error("Error eliminando el elemento:", error);
            // Captura errores y los muestra en la consola.
        }
    };

    return (
        <>
            <button
                onClick={handleDelete}
                // Llama a `handleDelete` al hacer clic en el botón.
                className="px-4 py-2 border border-red-600 text-white rounded hover:bg-red-100 shadow hover:shadow-md transition-all duration-300 w-14"
                // Estilo del botón: interactivo con hover y transiciones.
            >
                <img src="/icons/delete.svg" alt="Descargar" className="h-5 w-5" />
                {/* Ícono dentro del botón con tamaño fijo. */}
            </button>
        </>
    );
}