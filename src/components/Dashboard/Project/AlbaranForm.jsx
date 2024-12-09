"use client";
// Habilita el modo cliente para que este componente funcione en el navegador.

import { useForm } from "react-hook-form";
// Importa React Hook Form para manejar formularios y validaciones.

import getCookie from "@/components/Auth/getCookie";
// Importa `getCookie` para obtener el token de autenticación.

export default function AlbaranForm({ projectId, clientId, onNewAlbaran }) {
  // Componente `AlbaranForm` para crear un nuevo albarán.
  // Recibe:
  // - `projectId` y `clientId` para asociar el albarán a un proyecto y cliente.
  // - `onNewAlbaran` como callback tras crear el albarán exitosamente.

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  // `register`: Vincula campos al formulario.
  // `handleSubmit`: Maneja el envío del formulario.
  // `reset`: Restablece los campos tras un envío exitoso.
  // `errors`: Contiene errores de validación.

  const onSubmit = async (data) => {
    // Lógica para manejar el envío del formulario.
    const token = getCookie("jwt");
    // Obtiene el token para autenticar la solicitud.

    if (token && projectId && clientId) {
      try {
        const payload = { ...data, projectId, clientId };
        // Combina los datos del formulario con `projectId` y `clientId`.

        const response = await fetch("https://bildy-rpmaya.koyeb.app/api/deliverynote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
          // Envía la solicitud POST a la API con los datos.
        });

        if (!response.ok) throw new Error("Error al crear albarán");
        // Maneja errores de respuesta.

        reset();
        onNewAlbaran();
        // Resetea el formulario y ejecuta el callback tras la creación.
      } catch (err) {
        console.error("Error al crear el albarán:", err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8 p-4 border rounded-md bg-gray-50 shadow">
      {/* Formulario con estilos de diseño limpio y validación controlada. */}
      
      <h3 className="text-lg font-semibold mb-2">Crear Nuevo Albarán</h3>

      <div>
        <label className="block text-sm font-medium mb-2">Formato</label>
        <select
          {...register("format", { required: "El formato es obligatorio" })}
          className="w-full p-2 border rounded-md"
        >
          {/* Campo de selección para el formato del albarán. */}
          <option value="">Selecciona un formato</option>
          <option value="material">Material</option>
          <option value="hours">Horas</option>
        </select>
        {errors.format && <span className="text-red-500 text-sm">{errors.format.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Material</label>
        <input
          type="text"
          {...register("material")}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Horas</label>
        <input
          type="number"
          {...register("hours", { valueAsNumber: true })}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Descripción</label>
        <textarea
          {...register("description", { required: "La descripción es obligatoria" })}
          className="w-full p-2 border rounded-md"
        />
        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Fecha de trabajo</label>
        <input
          type="date"
          {...register("workdate", { required: "La fecha es obligatoria" })}
          className="w-full p-2 border rounded-md"
        />
        {errors.workdate && <span className="text-red-500 text-sm">{errors.workdate.message}</span>}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300"
      >
        Crear Albarán
      </button>
    </form>
  );
}

