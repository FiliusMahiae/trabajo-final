"use client";
// Habilita el modo cliente para que este componente se ejecute en el navegador.

export default function InputField({ label, name, register, validation, error }) {
  // Componente `InputField` para crear un campo de entrada con validación.
  // Recibe:
  // - `label`: Texto que describe el campo.
  // - `name`: Nombre del campo en el formulario.
  // - `register`: Función para registrar el campo con React Hook Form.
  // - `validation`: Reglas de validación para el campo.
  // - `error`: Mensaje de error relacionado con este campo.

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {/* Etiqueta del campo, estilizada para alinearse con el diseño del formulario. */}

      <input
        type="text"
        {...register(name, validation)}
        // Registra el campo con su nombre y reglas de validación.
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
      // Campo de entrada estilizado con Tailwind CSS para enfoque accesible y diseño claro.
      />

      {error && <span className="text-red-500 text-sm">{error.message}</span>}
      {/* Muestra el mensaje de error en texto rojo si hay un error. */}
    </div>
  );
}
