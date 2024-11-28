export default function FormFields({ register, errors }) {
    return (
        <>
            <div>
                <label className="block text-sm font-medium mb-2">Nombre proyecto</label>
                <input
                    type="text"
                    {...register("name", { required: "El nombre del proyecto es obligatorio" })}
                    className="w-full p-2 border rounded-md"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Código del proyecto</label>
                <input
                    type="text"
                    {...register("projectCode", { required: "El código del proyecto es obligatorio" })}
                    className="w-full p-2 border rounded-md"
                />
                {errors.projectCode && <span className="text-red-500 text-sm">{errors.projectCode.message}</span>}
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
                    className="w-full p-2 border rounded-md"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Código interno del proyecto</label>
                <input
                    type="text"
                    {...register("code", {
                        required: "El código interno del proyecto es obligatorio",
                        value: `PROJ-${Math.floor(1000 + Math.random() * 9000)}`, // Genera un código interno automáticamente
                    })}
                    className="w-full p-2 border rounded-md"
                    readOnly
                />
                {errors.code && <span className="text-red-500 text-sm">{errors.code.message}</span>}
            </div>
        </>
    );
}
