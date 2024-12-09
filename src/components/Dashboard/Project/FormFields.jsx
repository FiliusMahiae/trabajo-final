export default function FormFields({ register, errors }) {
    // Componente `FormFields` que renderiza los campos de un formulario.
    // Recibe `register` (función de React Hook Form para registrar campos) y `errors` (objeto de errores de validación).

    return (
        <>
            <div>
                <label className="block text-sm font-medium mb-2">Nombre proyecto</label>
                {/* Etiqueta del campo de entrada para el nombre del proyecto con estilo para espaciado y fuente. */}

                <input
                    type="text"
                    {...register("name", { required: "El nombre del proyecto es obligatorio" })}
                    // Campo de entrada para el nombre del proyecto. Se registra con React Hook Form para validación.
                    // `required` valida que este campo no esté vacío y muestra un mensaje de error si no se cumple.
                    className="w-full p-2 border rounded-md"
                // Estilizado con Tailwind para ocupar todo el ancho, agregar padding, bordes y esquinas redondeadas.
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                {/* Si hay un error en el campo "name", muestra el mensaje correspondiente en texto rojo. */}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Código del proyecto</label>
                <input
                    type="text"
                    {...register("projectCode", { required: "El código del proyecto es obligatorio" })}
                    // Campo de entrada para el código del proyecto con validación `required`.
                    className="w-full p-2 border rounded-md"
                />
                {errors.projectCode && <span className="text-red-500 text-sm">{errors.projectCode.message}</span>}
                {/* Si hay un error en "projectCode", muestra el mensaje de error correspondiente. */}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                    type="email"
                    {...register("email", {
                        required: "El email es obligatorio",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "El correo electrónico no es válido",
                        },
                    })}
                    // Campo de entrada para el email con validación:
                    // `required`: El campo no puede estar vacío.
                    // `pattern`: Valida que el formato del email sea correcto con una expresión regular.
                    className="w-full p-2 border rounded-md"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                {/* Muestra un mensaje de error si hay problemas con el campo "email". */}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Código interno del proyecto</label>
                <input
                    type="text"
                    {...register("code", {
                        required: "El código interno del proyecto es obligatorio",
                        value: `PROJ-${Math.floor(1000 + Math.random() * 9000)}`,
                        // Asigna automáticamente un valor por defecto al código interno con un formato único.
                    })}
                    className="w-full p-2 border rounded-md"
                    readOnly
                // El campo es de solo lectura (`readOnly`) para evitar modificaciones por parte del usuario.
                />
                {errors.code && <span className="text-red-500 text-sm">{errors.code.message}</span>}
                {/* Si hay un error en el campo "code", muestra el mensaje correspondiente. */}
            </div>
        </>
    );
}