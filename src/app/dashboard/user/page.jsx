"use client";

import { useEffect, useState } from "react";
import getCookie from "@/components/Auth/getCookie";
import { useForm } from "react-hook-form";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState("");
  const [successMessage, setSuccess] = useState("");
  const [errorMessage, setError] = useState("");
  const [profileImage, setProfileImage] = useState("/userProfile.png");

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const fetchUser = async () => {
      const token = getCookie("jwt");
      try {
        const res = await fetch("https://bildy-rpmaya.koyeb.app/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setErrorUser("No se pudo obtener la información del usuario.");
          setLoadingUser(false);
          return;
        }

        const data = await res.json();
        setUser(data);
        setProfileImage(data.logo || "/userProfile.png");
        setLoadingUser(false);
      } catch (error) {
        console.error(error);
        setErrorUser("Error al cargar el perfil.");
        setLoadingUser(false);
      }
    };

  useEffect(()=>{
    fetchUser();
  },[])

  const updateProfileImage = async (file) => {
    const token = getCookie("jwt");
    if (!file || !token) {
      setError("Por favor selecciona una imagen y asegúrate de estar autenticado.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file, file.name);

    try {
      const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user/logo", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Autenticación inválida.");
        } else {
          throw new Error("Error al actualizar la foto de perfil.");
        }
      }

      fetchUser();
    } catch (err) {
      setError(err.message);
    }
  };

  const onSubmit = async (data) => {
    const token = getCookie("jwt");
    if (!token) {
      setError("Token no encontrado. Por favor inicia sesión.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user/password", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Autenticación inválida.");
        } else if (response.status === 422) {
          throw new Error("Error de validación. Verifique los campos.");
        } else {
          throw new Error("Error al cambiar la contraseña.");
        }
      }

      setSuccess("Contraseña cambiada con éxito.");
      setTimeout(() => {setSuccess("")},5000);
      setError("");
      reset();
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-700">Cargando información del usuario...</p>
      </div>
    );
  }

  if (errorUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600">{errorUser}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>

      {user && (
        <div className="mb-8 flex items-center space-x-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Datos Personales</h2>
            <p><span className="font-semibold">Nombre:</span> {user.name} {user.surnames}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">NIF:</span> {user.nif}</p>
          </div>
          <div className="relative">
            <img
              src={profileImage}
              alt="Foto del Usuario"
              className="w-40 h-40 rounded-full object-cover border border-gray-300"
            />
            <input
              type="file"
              accept="image/*"
              className="absolute top-0 left-0 w-40 h-40 opacity-0 cursor-pointer"
              onChange={(e) => updateProfileImage(e.target.files[0])}
            />
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Cambiar Contraseña</h2>
        {errorMessage && (
        <div className="bg-red-100 border border-red-600 text-gray-700 py-2 px-4 rounded mb-4 shadow-md transition-opacity duration-500">
          {errorMessage}
        </div>
      )}
        {successMessage && (
        <div className="bg-green-100 border border-green-600 text-gray-700 py-2 px-4 rounded mb-4 shadow-md transition-opacity duration-500">
          {successMessage}
        </div>
      )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Nueva Contraseña</label>
            <input
              type="password"
              {...register("password", { required: "La contraseña es obligatoria." })}
              className="w-full border border-gray-300 rounded p-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">Confirmar Contraseña</label>
            <input
              type="password"
              {...register("confirmPassword", { required: "Debe confirmar la contraseña." })}
              className="w-full border border-gray-300 rounded p-2"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
}

