"use client";
// Habilita el modo cliente para que este componente se ejecute en el navegador.

import getCookie from "@/components/Auth/getCookie";
// Importa `getCookie` para obtener el token de autenticación desde las cookies.

export default function DeleteButton({ noteId, onDelete }) {
  // Componente `DeleteButton` para eliminar una nota de entrega.
  // Recibe:
  // - `noteId`: ID de la nota que se desea eliminar.
  // - `onDelete`: Callback que se ejecuta tras eliminar exitosamente la nota.

  const handleDelete = async () => {
    if (!noteId) return;
    // Verifica que se haya proporcionado un `noteId`.

    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta nota de entrega? Esta acción no se puede deshacer."
    );
    // Muestra un cuadro de confirmación para evitar eliminaciones accidentales.

    if (!confirmDelete) return;

    const token = getCookie('jwt');
    // Obtiene el token JWT desde las cookies.

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
            'Authorization': `Bearer ${token}`,
            // Envía el token en los encabezados para autenticar la solicitud.
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Procesa la respuesta de la API.

        if (data.acknowledged) {
          onDelete && onDelete(noteId);
          // Llama a la función `onDelete` para actualizar la lista tras la eliminación.
        } else {
          alert("No se pudo eliminar la nota de entrega. Inténtalo de nuevo más tarde.");
        }
      } else {
        alert("No se pudo eliminar la nota de entrega. Inténtalo de nuevo más tarde.");
      }
    } catch (error) {
      console.error("Error eliminando la nota de entrega:", error);
      // Muestra cualquier error que ocurra durante la solicitud.
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 border border-red-600 text-white rounded hover:bg-red-100 shadow hover:shadow-md transition-all duration-300"
    // Botón estilizado con clases Tailwind para resaltar su función de eliminación.
    >
      <img src="/icons/delete.svg" alt="Descargar" className="h-5 w-5" />
      {/* Ícono dentro del botón para representar la acción de eliminar. */}
    </button>
  );
}