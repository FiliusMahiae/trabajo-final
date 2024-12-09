export default function Modal({ message, onClose }) {
    // Componente `Modal` que muestra un mensaje modal con un botón para cerrarlo.
    // Recibe `message` (texto del mensaje) y `onClose` (función para cerrar el modal).

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            {/* Contenedor del fondo:
                - `fixed inset-0`: Ocupa toda la pantalla.
                - `flex items-center justify-center`: Centra el modal.
                - `bg-opacity-50`: Fondo negro semitransparente.
                - `z-50`: Asegura que el modal esté encima de otros elementos. */}
            
            <div className="bg-white p-8 rounded shadow-lg text-center max-w-sm mx-auto">
                {/* Contenedor principal del modal con fondo blanco, sombra y diseño centrado. */}
                
                <img
                    src="/like.svg"
                    alt="Success Tick"
                    className="mx-auto mb-4 w-16 h-16"
                />
                {/* Ícono decorativo centrado con tamaño fijo. */}
                
                <h2 className="text-2xl font-bold mb-4">
                    {message || "¡Acción completada con éxito!"}
                </h2>
                {/* Mensaje principal del modal con un texto predeterminado si no se proporciona `message`. */}
                
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    {/* Botón que llama a `onClose` para cerrar el modal. */}
                    Continuar
                </button>
            </div>
        </div>
    );
}
