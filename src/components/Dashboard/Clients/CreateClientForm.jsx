"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import InputField from "./InputField";
import AddressFields from "./AddressFields";
import Popup from "./Popup";

export default function CreateClientForm({ onSubmit, showPopup, setShowPopup, errors }) {
    const { register, handleSubmit, reset } = useForm();

  return (
    <div className="text-gray-900 p-8">
      <h1 className="text-2xl font-bold mb-6">Crear Cliente</h1>
      {showPopup && (
        <Popup setShowPopup={setShowPopup} />
      )}
      <form onSubmit={handleSubmit((data) => onSubmit(data, reset))} className="space-y-4">
        <InputField
          label="Nombre"
          name="name"
          register={register}
          validation={{ required: "El nombre es obligatorio", maxLength: { value: 50, message: 'El nombre debe tener menos de 50 caracteres' }}}
          error={errors.name}
        />
        <InputField
          label="CIF"
          name="cif"
          register={register}
          validation={{
            required: "El CIF es obligatorio",
            maxLength: { value: 9, message: 'El CIF debe tener 9 caracteres' },
            minLength: { value: 9, message: 'El CIF debe tener 9 caracteres' }
          }}
          error={errors.cif}
        />
        <AddressFields register={register} errors={errors} />
        <div className="mb-4 grid grid-cols-2 gap-4">
          <Link href="/dashboard/clients">
            <button
              type="button"
              className="w-full py-2 px-4 white text-red-600 border border-red-600 rounded-md shadow-md hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300">
              Descartar
            </button>
          </Link>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md transition-all duration-300">
            Crear Cliente
          </button>
        </div>
      </form>
    </div>
  );
}