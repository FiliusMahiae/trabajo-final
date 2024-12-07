"use client";

import { useEffect, useState } from "react";
import { useNavbar } from "@/context/NavbarContext";
import getCookie from "@/components/Auth/getCookie";
import CreateClientForm from "@/components/Dashboard/Clients/CreateClientForm";

export default function PageCreateClient() {
  const { updateNavbar } = useNavbar();
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    updateNavbar("Crear Cliente", "Creación de clientes");
  }, [updateNavbar]);

  const onSubmit = async (data, reset) => {
    const token = getCookie('jwt');
    if (token) {
      try {
        const response = await fetch("https://bildy-rpmaya.koyeb.app/api/client", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        await response.json();
        setErrors({});
        setShowPopup(true);
        reset();
      } catch (error) {
        console.error("Error al crear cliente:", error);
      }
    }
  };

  return (
    <CreateClientForm 
      onSubmit={onSubmit} 
      showPopup={showPopup} 
      setShowPopup={setShowPopup} 
      errors={errors} 
    />
  );
}
