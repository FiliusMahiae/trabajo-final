"use client";
// Habilita el modo cliente para que este componente se ejecute en el navegador.

import React from "react";
import Link from "next/link";
// Importa `Link` de Next.js para la navegación interna.

import DownloadButton from "./DownloadButton";
// Botón para descargar el albarán.

import DeleteButton from "./DeleteButton";
// Botón para eliminar el albarán.

export default function DeliveryNoteCard({ note, index, onDelete }) {
  // Componente `DeliveryNoteCard` para mostrar la información de un albarán.
  // Recibe:
  // - `note`: Los datos del albarán.
  // - `index`: La posición en la lista para aplicar estilos alternos.
  // - `onDelete`: Función callback para manejar la eliminación del albarán.

  const statusStyles = note.pending
    ? "bg-yellow-100 text-yellow-700 border-yellow-400"
    : "bg-green-100 text-green-700 border-green-400";
  // Estilos condicionales para mostrar el estado del albarán (Pendiente o Firmado).

  return (
    <div
      className={`grid grid-cols-6 gap-4 border-b px-4 py-5 items-center ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
        }`}
    // Contenedor del albarán con diseño de rejilla y estilos alternos según el índice.
    >
      <Link href={`/dashboard/projects/${note.projectId._id}`}>
        <div className="w-1/6 cursor-pointer underline text-blue-500">
          {note._id}
        </div>
        {/* Enlace al proyecto asociado al albarán. */}
      </Link>
      <div className="w-1/6">
        {new Date(note.createdAt).toLocaleDateString()}
        {/* Fecha de creación del albarán en formato local. */}
      </div>
      <div className="w-auto truncate">{note.description}</div>
      {/* Descripción del albarán con truncado para evitar desbordes. */}
      <div className="w-1/6">{note.hours}</div>
      {/* Horas asociadas al albarán. */}
      <div className="w-1/6">
        <span
          className={`px-3 py-1 text-sm font-medium border rounded-md ${statusStyles}`}
        >
          {note.pending ? "Pendiente" : "Firmado"}
          {/* Estado del albarán con estilos condicionales. */}
        </span>
      </div>
      <div className="flex justify-start items-center space-x-2">
        <DownloadButton noteId={note._id} />
        {/* Botón para descargar el albarán. */}
        <DeleteButton noteId={note._id} onDelete={onDelete} />
        {/* Botón para eliminar el albarán. */}
      </div>
    </div>
  );
}