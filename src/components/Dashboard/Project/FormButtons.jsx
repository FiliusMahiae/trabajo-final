export default function FormButtons({ reset }) {
    // Componente `FormButtons` que renderiza botones para descartar o guardar cambios.
    // Recibe `reset` como prop para restablecer el formulario.

    return (
        <div className="flex justify-end gap-4">
            {/* Contenedor de los botones:
                - `flex justify-end`: Alinea los botones al final.
                - `gap-4`: Añade espacio entre los botones. */}
            
            <button 
                type="button" 
                onClick={() => reset()}
                // Botón que llama a la función `reset` para descartar los cambios.
                className="px-4 py-2 border rounded-md text-white bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg transition-all duration-300"
                // Estilo: Botón rojo con efectos de hover, sombras y transición suave.
            >
                Descartar
            </button>

            <button 
                type="submit"
                // Botón para enviar el formulario (tipo `submit`).
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md hover:shadow-lg transition-all duration-300"
                // Estilo: Botón azul con efectos de hover, sombras y transición suave.
            >
                Guardar
            </button>
        </div>
    );
}