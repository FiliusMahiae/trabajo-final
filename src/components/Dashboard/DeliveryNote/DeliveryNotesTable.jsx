"use client"; // Este comentario activa el modo cliente para un componente en una aplicación Next.js.

import { useState, useEffect } from "react"; // Importamos hooks de React para manejar el estado y efectos secundarios.
import DeliveryNoteCard from "./DeliveryNoteCard"; // Importamos un componente para representar cada nota de entrega.

export default function DeliveryNotesTable({ deliveryNotes: initialDeliveryNotes }) {
  // Definimos un estado local para las notas de entrega. Inicialmente se basa en las notas pasadas como props.
  const [deliveryNotes, setDeliveryNotes] = useState(initialDeliveryNotes);
  
  // Estado para manejar la configuración de ordenamiento: clave por la cual se ordena y dirección (ascendente o descendente).
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Actualizamos el estado local de notas de entrega si cambian las notas iniciales.
  useEffect(() => {
    setDeliveryNotes(initialDeliveryNotes);
  }, [initialDeliveryNotes]);

  // Función para manejar el ordenamiento de las notas de entrega por una clave específica.
  const handleSort = (key) => {
    let direction = "asc"; // Dirección predeterminada es ascendente.

    // Si la clave actual ya está seleccionada para ordenar y es ascendente, cambiamos a descendente.
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    // Si la clave actual ya está seleccionada y es descendente, eliminamos el orden.
    else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = null;
    }

    // Creamos una copia de las notas de entrega para manipular sin afectar el estado original.
    let sortedNotes = [...deliveryNotes];

    // Si la dirección no es nula (ascendente o descendente), realizamos el ordenamiento.
    if (direction) {
      sortedNotes.sort((a, b) => {
        // Comparación basada en la clave seleccionada.
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1; // Ordena ascendente o descendente según la dirección.
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0; // Si los valores son iguales, no cambia el orden.
      });
    } else {
      // Si no hay dirección, se restablece el orden original (las notas iniciales).
      sortedNotes = initialDeliveryNotes;
    }

    // Actualizamos el estado de notas y la configuración de ordenamiento.
    setDeliveryNotes(sortedNotes);
    setSortConfig({ key, direction });
  };

  // Función para obtener el ícono de ordenamiento (ascendente, descendente o nulo) según la clave seleccionada.
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null; // Si no es la clave actual, no mostramos icono.
    if (sortConfig.direction === "asc") return "↑"; // Icono para orden ascendente.
    if (sortConfig.direction === "desc") return "↓"; // Icono para orden descendente.
    return null; // Sin dirección seleccionada.
  };

  // Función para manejar la eliminación de una nota específica.
  const handleDelete = (deletedNoteId) => {
    // Filtramos las notas actuales para excluir la nota eliminada.
    setDeliveryNotes((prevNotes) => prevNotes.filter((note) => note._id !== deletedNoteId));
  };

  // Renderizamos la tabla con cabecera interactiva para ordenamiento y las notas de entrega.
  return (
    <div className="overflow-x-auto w-full shadow-md rounded-lg border border-gray-200">
      <div className="min-w-full bg-white">
        {/* Cabecera con columnas. Algunas son clicables para ordenar por la clave correspondiente. */}
        <div className="bg-gray-100 grid grid-cols-6 gap-4 px-4 py-3 font-semibold text-gray-700">
          <div className="w-1/6 flex items-center gap-2">Código</div>
          <div
            className="w-1/6 cursor-pointer flex items-center gap-2"
            onClick={() => handleSort("createdAt")}
          >
            Creación
            <span>{getSortIcon("createdAt")}</span>
          </div>
          <div
            className="w-1/6 cursor-pointer flex items-center gap-2"
            onClick={() => handleSort("description")}
          >
            Descripción
            <span>{getSortIcon("description")}</span>
          </div>
          <div
            className="w-1/6 cursor-pointer flex items-center gap-2"
            onClick={() => handleSort("hours")}
          >
            Horas
            <span>{getSortIcon("hours")}</span>
          </div>
          <div
            className="w-1/6 cursor-pointer flex items-center gap-2"
            onClick={() => handleSort("status")}
          >
            Estado
            <span>{getSortIcon("status")}</span>
          </div>
          <div className="w-1/6">Acciones</div>
        </div>

        {/* Iteramos sobre las notas y las renderizamos usando el componente DeliveryNoteCard. */}
        {deliveryNotes.map((note, index) => (
          <DeliveryNoteCard
            key={note._id} // Usamos el ID único como clave.
            note={note} // Pasamos los datos de la nota al componente.
            index={index} // Incluimos el índice para posibles usos.
            onDelete={handleDelete} // Pasamos la función para manejar eliminación.
          />
        ))}
      </div>
    </div>
  );
}


