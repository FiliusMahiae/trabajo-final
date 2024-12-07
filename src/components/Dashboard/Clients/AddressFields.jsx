"use client";

import InputField from "./InputField";

export default function AddressFields({ register, errors }) {
    return (
      <div className="space-y-4">
        <div className="mb-4 grid grid-cols-2 gap-4">
          <InputField
            label="Calle"
            name="address.street"
            register={register}
            validation={{ required: "La calle es obligatoria" }}
            error={errors?.address?.street}
          />
          <InputField
            label="Número (Portal)"
            name="address.number"
            register={register}
            validation={{ required: "El número es obligatorio" }}
            error={errors?.address?.number}
          />
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <InputField
            label="Código Postal"
            name="address.postal"
            register={register}
            validation={{
              required: "El código postal es obligatorio",
              maxLength: { value: 5, message: 'El Código Postal debe tener 5 caracteres' },
              minLength: { value: 5, message: 'El Código Postal debe tener 5 caracteres' }
            }}
            error={errors?.address?.postal}
          />
          <InputField
            label="Ciudad"
            name="address.city"
            register={register}
            validation={{ required: "La ciudad es obligatoria" }}
            error={errors?.address?.city}
          />
        </div>
        <InputField
          label="Provincia"
          name="address.province"
          register={register}
          validation={{ required: "La provincia es obligatoria" }}
          error={errors?.address?.province}
        />
      </div>
    );
  }
  