export default function AddressFields({ register, errors }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-2">Dirección</label>
            <input
                type="text"
                placeholder="Calle"
                {...register("address.street", { required: "La calle es obligatoria" })}
                className="w-full p-2 border rounded-md mb-2"
            />
            {errors.address?.street && <span className="text-red-500 text-sm">{errors.address.street.message}</span>}

            <input
                type="text"
                placeholder="Número"
                {...register("address.number", {
                    required: "El número es obligatorio",
                    pattern: {
                        value: /^[0-9]+$/,
                        message: "El número debe ser un valor numérico",
                    },
                })}
                className="w-full p-2 border rounded-md mb-2"
            />
            {errors.address?.number && <span className="text-red-500 text-sm">{errors.address.number.message}</span>}

            <input
                type="text"
                placeholder="Código Postal"
                {...register("address.postal", {
                    required: "El código postal es obligatorio",
                    pattern: {
                        value: /^[0-9]{5}$/,
                        message: "El código postal debe tener exactamente 5 dígitos",
                    },
                })}
                className="w-full p-2 border rounded-md mb-2"
            />
            {errors.address?.postal && <span className="text-red-500 text-sm">{errors.address.postal.message}</span>}

            <input
                type="text"
                placeholder="Ciudad"
                {...register("address.city", { required: "La ciudad es obligatoria" })}
                className="w-full p-2 border rounded-md mb-2"
            />
            {errors.address?.city && <span className="text-red-500 text-sm">{errors.address.city.message}</span>}

            <input
                type="text"
                placeholder="Provincia"
                {...register("address.province", { required: "La provincia es obligatoria" })}
                className="w-full p-2 border rounded-md"
            />
            {errors.address?.province && <span className="text-red-500 text-sm">{errors.address.province.message}</span>}
        </div>
    );
}
