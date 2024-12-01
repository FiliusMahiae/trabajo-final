"use client";

import React from 'react';
import getCookie from "@/components/Auth/getCookie";

export default function DownloadButton({ noteId }) {
  const handleDownload = async () => {
    try {
      // Obtiene el token de autenticación almacenado en el navegador
      const token = getCookie('jwt');
      if (!token) {
        console.error("Token de autenticación no encontrado");
        return;
      }

      // Realiza una llamada a la API para descargar el PDF
      const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/pdf/${noteId}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Incluye el token en el encabezado
        },
      });

      // Verifica si la respuesta es correcta
      if (!response.ok) {
        console.error("Error al descargar el PDF:", response.statusText);
        return;
      }

      // Convierte la respuesta en un archivo Blob
      const blob = await response.blob();

      // Crea una URL temporal para descargar el archivo
      const url = window.URL.createObjectURL(blob);

      // Crea un enlace (elemento <a>) para disparar la descarga
      const link = document.createElement('a');
      link.href = url;
      link.download = `DeliveryNote_${noteId}.pdf`; // Asigna un nombre al archivo descargado
      link.click(); // Simula el clic en el enlace

      // Libera la URL temporal
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al realizar la descarga:", error); // Maneja errores de red o de ejecución
    }
  };

  return (
    <button
      onClick={handleDownload} // Ejecuta la función de descarga al hacer clic
      className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-md shadow hover:bg-gray-100 hover:shadow-md transition-all duration-300"
    >
      <img src="/icons/download.svg" alt="Descargar" className="h-5 w-5" /> {/* Ícono de descarga */}
    </button>
  );
}

