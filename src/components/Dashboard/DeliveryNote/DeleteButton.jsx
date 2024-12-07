"use client";

import { useState } from "react";
import getCookie from "@/components/Auth/getCookie";

export default function DeleteButton({ noteId, onDelete }) {

  const handleDelete = async () => {
    if (!noteId) return;

    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta nota de entrega? Esta acción no se puede deshacer."
    );

    if (!confirmDelete) return;

    const token = getCookie('jwt');
    if (!token) {
      console.error("Token de autenticación no encontrado");
      return;
    }

    try {
      const response = await fetch(
        `https://bildy-rpmaya.koyeb.app/api/deliverynote/${noteId}`,
        {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`, // Incluye el token en el encabezado
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.acknowledged) {
          onDelete && onDelete(noteId);
        } else {
          alert("No se pudo eliminar la nota de entrega. Inténtalo de nuevo más tarde.");
        }
      } else {
        alert("No se pudo eliminar la nota de entrega. Inténtalo de nuevo más tarde.");
      }
    } catch (error) {
      console.error("Error eliminando la nota de entrega:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 border border-red-600 text-white rounded hover:bg-red-100 shadow hover:shadow-md transition-all duration-300"
    >
      <img src="/icons/delete.svg" alt="Descargar" className="h-5 w-5" /> {/* Ícono de descarga */}
    </button>
  );
}


