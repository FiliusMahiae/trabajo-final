"use client";

import React from "react";
import getCookie from "@/components/Auth/getCookie";

export default function DeleteButton({ itemId, deleteUrl, onDelete, confirmMessage = "¿Estás seguro de que deseas eliminar este elemento?" }) {
    const handleDelete = async () => {
        if (!itemId) return;

        const confirmDelete = window.confirm(confirmMessage);

        if (!confirmDelete) return;

        const token = getCookie('jwt');
        if (!token) {
            console.error("Token de autenticación no encontrado");
            return;
        }

        try {
            const response = await fetch(deleteUrl.replace("{id}", itemId), {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                onDelete && onDelete(itemId);
            } else {
                alert("No se pudo eliminar el elemento. Inténtalo de nuevo más tarde.");
            }
        } catch (error) {
            console.error("Error eliminando el elemento:", error);
        }
    };

    return (
        <>
            <button
                onClick={handleDelete}
                className="px-4 py-2 border border-red-600 text-white rounded hover:bg-red-100 shadow hover:shadow-md transition-all duration-300 w-14"
            >
                <img src="/icons/delete.svg" alt="Descargar" className="h-5 w-5" /> {/* Ícono de descarga */}
            </button>
        </>
    );
}
