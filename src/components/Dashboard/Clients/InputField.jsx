"use client";

export default function InputField({ label, name, register, validation, error }) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type="text"
          {...register(name, validation)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
        />
        {error && <span className="text-red-500 text-sm">{error.message}</span>}
      </div>
    );
  }