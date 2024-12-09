"use client";
// Habilita el modo cliente para que este componente se ejecute en el navegador.

export default function Popup({ setShowPopup }) {
  // Componente `Popup` que muestra un mensaje modal con un botón para cerrarlo.
  // Recibe `setShowPopup` como prop para controlar la visibilidad del popup.

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {/* Contenedor del overlay:
          - `fixed inset-0`: Ocupa toda la pantalla.
          - `flex items-center justify-center`: Centra el contenido modal.
          - `bg-black bg-opacity-50`: Fondo semitransparente negro. */}
      
      <div className="bg-white p-8 rounded shadow-lg text-center">
        {/* Contenedor principal del popup:
            - `bg-white`: Fondo blanco.
            - `p-8`: Padding interno.
            - `rounded`: Bordes redondeados.
            - `shadow-lg`: Sombra para resaltar. */}
        
        <img
          src="/like.svg"
          alt="Success Tick"
          className="mx-auto mb-4 w-16 h-16"
          // Ícono decorativo centrado con tamaño fijo.
        />
        
        <h2 className="text-2xl font-bold mb-4">¡Cliente creado y guardado con éxito!</h2>
        {/* Mensaje principal del popup con estilo destacado. */}
        
        <button
          onClick={() => setShowPopup(false)}
          // Botón que actualiza `setShowPopup` a `false` para cerrar el popup.
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          // Botón estilizado con efectos de hover y enfoque accesibles.
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
