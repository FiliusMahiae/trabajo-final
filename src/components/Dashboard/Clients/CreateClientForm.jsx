"use client";
// Habilita el modo cliente para que este componente se ejecute en el navegador.

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
// Importaciones necesarias para manejar formularios, estado, navegación, y componentes reutilizables.

import InputField from "./InputField";
import AddressFields from "./AddressFields";
import Popup from "./Popup";
// Importa componentes reutilizables para campos de entrada, dirección, y notificaciones emergentes.

export default function CreateClientForm({
  onSubmit,
  showPopup,
  setShowPopup,
  errors,
  onFileChange,
}) {
  // Componente `CreateClientForm` para manejar la creación de un cliente.
  // Recibe:
  // - `onSubmit`: Función para manejar el envío del formulario.
  // - `showPopup` y `setShowPopup`: Controlan la visibilidad del popup.
  // - `errors`: Maneja errores de validación.
  // - `onFileChange`: Función para manejar la carga del logo.

  const { register, handleSubmit, reset } = useForm();
  const [selectedFileName, setSelectedFileName] = useState("");
  // Estado para almacenar el nombre del archivo seleccionado.

  return (
    <div className="text-gray-900 p-8">
      {/* Contenedor principal con estilos para espaciado y color. */}
      <h1 className="text-2xl font-bold mb-6">Crear Cliente</h1>
      {/* Título del formulario. */}

      {showPopup && <Popup setShowPopup={setShowPopup} />}
      {/* Muestra el popup si `showPopup` es verdadero. */}

      <form
        onSubmit={handleSubmit((data) => onSubmit(data, reset))}
        className="space-y-6"
        // Manejador de envío de formulario con validación.
      >
        {/* Nombre */}
        <InputField
          label="Nombre"
          name="name"
          register={register}
          validation={{
            required: "El nombre es obligatorio",
            maxLength: { value: 50, message: "El nombre debe tener menos de 50 caracteres" },
          }}
          error={errors.name}
        />

        {/* CIF */}
        <InputField
          label="CIF"
          name="cif"
          register={register}
          validation={{
            required: "El CIF es obligatorio",
            maxLength: { value: 9, message: "El CIF debe tener 9 caracteres" },
            minLength: { value: 9, message: "El CIF debe tener 9 caracteres" },
          }}
          error={errors.cif}
        />

        {/* Dirección */}
        <AddressFields register={register} errors={errors} />

        {/* Subir Imagen */}
        <div className="space-y-2">
          <label
            htmlFor="logo"
            className="block text-sm font-medium text-gray-700"
          >
            Subir Logo
          </label>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="logo"
              className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300 shadow-md"
            >
              Seleccionar archivo
            </label>
            <span className="text-sm text-gray-500 italic">
              {selectedFileName ? selectedFileName : "Ningún archivo seleccionado"}
            </span>
          </div>
          <input
            id="logo"
            type="file"
            accept="image/*"
            onChange={(e) => {
              onFileChange(e.target.files[0]);
              setSelectedFileName(e.target.files[0]?.name || "");
            }}
            className="hidden"
          />
        </div>

        {/* Botones */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/dashboard/clients">
            <button
              type="button"
              className="w-full py-2 px-4 text-red-600 border border-red-600 rounded-md shadow-md hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
            >
              Descartar
            </button>
          </Link>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-300"
          >
            Crear Cliente
          </button>
        </div>
      </form>
    </div>
  );
}