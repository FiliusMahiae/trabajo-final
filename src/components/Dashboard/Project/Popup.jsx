"use client";
// Habilita el modo cliente para que este componente se ejecute en el navegador.

export default function Popup({ setShowPopup }) {
  // Componente `Popup` que muestra un mensaje modal con un botón para cerrarlo.
  // Recibe `setShowPopup` como prop para actualizar el estado de visibilidad del popup.

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {/* Contenedor de fondo del popup:
                - `fixed inset-0`: Ocupa toda la pantalla.
                - `flex items-center justify-center`: Centra el contenido dentro del viewport.
                - `bg-black bg-opacity-50`: Crea un fondo semitransparente para simular un overlay. */}

      <div className="bg-white p-8 rounded shadow-lg text-center">
        {/* Contenedor principal del contenido del popup:
                    - `bg-white`: Fondo blanco.
                    - `p-8`: Padding interno.
                    - `rounded`: Bordes redondeados para un diseño moderno.
                    - `shadow-lg`: Añade una sombra para destacar el popup.
                    - `text-center`: Centra el texto dentro del contenedor. */}

        <img
          src="/like.svg"
          alt="Success Tick"
          className="mx-auto mb-4 w-16 h-16"
        />
        {/* Imagen decorativa:
                    - `src="/like.svg"`: Ruta de la imagen mostrada (ícono de éxito).
                    - `alt="Success Tick"`: Descripción de la imagen para accesibilidad.
                    - `mx-auto`: Centra horizontalmente la imagen.
                    - `mb-4 w-16 h-16`: Margen inferior y tamaño fijo. */}

        <h2 className="text-2xl font-bold mb-4">
          ¡Proyecto creado y guardado con éxito!
        </h2>
        {/* Mensaje principal del popup:
                    - `text-2xl`: Tamaño de texto grande.
                    - `font-bold`: Texto en negrita.
                    - `mb-4`: Espaciado inferior. */}

        <button
          onClick={() => setShowPopup(false)}
          // Evento `onClick` que cambia el estado de `setShowPopup` a `false`, ocultando el popup.
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {/* Botón de acción para cerrar el popup:
                        - `mt-4`: Margen superior para separación del texto.
                        - `px-4 py-2`: Padding interno horizontal y vertical.
                        - `bg-blue-600 text-white`: Fondo azul y texto blanco.
                        - `rounded-md`: Bordes redondeados.
                        - `hover:bg-blue-700`: Cambia el color al pasar el cursor.
                        - `focus:outline-none`: Elimina el borde por defecto al enfocar.
                        - `focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`: Añade un anillo de enfoque accesible. */}
          Continuar
        </button>
      </div>
    </div>
  );
}