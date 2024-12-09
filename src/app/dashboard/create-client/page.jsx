"use client";
// Habilita el modo cliente para que este componente se ejecute en el navegador.

import { useEffect, useState } from "react";
import { useNavbar } from "@/context/NavbarContext";
// Contexto para actualizar la barra de navegación.

import getCookie from "@/components/Auth/getCookie";
// Función para obtener el token de autenticación desde las cookies.

import CreateClientForm from "@/components/Dashboard/Clients/CreateClientForm";
// Componente reutilizable para manejar el formulario de creación de clientes.

export default function PageCreateClient() {
  const { updateNavbar } = useNavbar();
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  // Estado para manejar la visibilidad del popup, errores y archivo de imagen seleccionado.

  useEffect(() => {
    updateNavbar("Crear Cliente", "Creación de clientes");
    // Actualiza la barra de navegación con el título y descripción adecuados.
  }, [updateNavbar]);

  const onFileChange = (file) => {
    console.log(file);
    setSelectedFile(file);
    // Almacena el archivo de imagen seleccionado.
  };

  const onSubmit = async (data, reset) => {
    const token = getCookie("jwt");
    // Obtiene el token JWT para autenticar las solicitudes.

    if (token) {
      try {
        // Enviar datos del cliente al servidor.
        const response = await fetch(
          "https://bildy-rpmaya.koyeb.app/api/client",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }

        const newClient = await response.json();
        setErrors({});
        setShowPopup(true);
        reset();
        // Muestra el popup y reinicia el formulario tras una creación exitosa.

        // Subir imagen si se seleccionó.
        if (selectedFile && newClient._id) {
          const formData = new FormData();
          formData.append("image", selectedFile, selectedFile.name);

          const uploadResponse = await fetch(
            `https://bildy-rpmaya.koyeb.app/api/client/logo/${newClient._id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );

          if (!uploadResponse.ok) {
            throw new Error("Error al subir la imagen");
          }
        }
      } catch (error) {
        console.error("Error al crear cliente o subir imagen:", error);
        // Maneja errores durante la creación del cliente o la subida de la imagen.
      }
    }
  };

  return (
    <CreateClientForm
      onSubmit={onSubmit}
      showPopup={showPopup}
      setShowPopup={setShowPopup}
      errors={errors}
      onFileChange={onFileChange}
      // Pasa las funciones y estados necesarios al formulario.
    />
  );
}