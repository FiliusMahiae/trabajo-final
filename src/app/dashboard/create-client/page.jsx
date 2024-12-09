"use client";

import { useEffect, useState } from "react";
import { useNavbar } from "@/context/NavbarContext";
import getCookie from "@/components/Auth/getCookie";
import CreateClientForm from "@/components/Dashboard/Clients/CreateClientForm";

export default function PageCreateClient() {
  const { updateNavbar } = useNavbar();
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null); // Estado para la imagen

  useEffect(() => {
    updateNavbar("Crear Cliente", "Creación de clientes");
  }, [updateNavbar]);

  const onFileChange = (file) => {
    console.log(file);
    setSelectedFile(file); // Guardar el archivo seleccionado
  };

  const onSubmit = async (data, reset) => {
    const token = getCookie("jwt");
    if (token) {
      try {
        // Crear cliente
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

        // Subir imagen si se seleccionó
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
      }
    }
  };

  return (
    <CreateClientForm
      onSubmit={onSubmit}
      showPopup={showPopup}
      setShowPopup={setShowPopup}
      errors={errors}
      onFileChange={onFileChange} // Pasar la función para manejar el archivo
    />
  );
}

