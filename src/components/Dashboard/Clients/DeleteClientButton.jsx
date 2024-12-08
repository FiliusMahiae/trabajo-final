"use client";

import React from "react";
import getCookie from "@/components/Auth/getCookie";

export default function DeleteClientButton({ clientId, onDelete }) {
    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer."
        );

        if (!confirmDelete) return;

        const token = getCookie("jwt");
        if (!token) {
            console.error("Token de autenticación no encontrado");
            return;
        }

        try {
            const response = await fetch(
                `https://bildy-rpmaya.koyeb.app/api/client/${clientId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                onDelete && onDelete(clientId);
            } else {
                alert("No se pudo eliminar el cliente. Inténtalo de nuevo más tarde.");
            }
        } catch (error) {
            console.error("Error eliminando el cliente:", error);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm shadow-md border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition-all duration-300"
        >
            Eliminar
        </button>
    );
}
