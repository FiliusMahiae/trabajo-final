"use client";
// Habilita el modo cliente.

import React from "react";
import getCookie from "@/components/Auth/getCookie";
// Obtiene el token de autenticación.

export default function DeleteClientButton({ clientId, onDelete }) {
    // Botón para eliminar un cliente.

    const handleDelete = async () => {
        // Lógica para confirmar y realizar la eliminación.
        if (!window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) return;

        const token = getCookie("jwt");
        if (!token) return console.error("Token no encontrado");

        try {
            const response = await fetch(
                `https://bildy-rpmaya.koyeb.app/api/client/${clientId}`,
                { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.ok) onDelete && onDelete(clientId);
            else alert("Error al eliminar el cliente.");
        } catch (error) {
            console.error("Error:", error);
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