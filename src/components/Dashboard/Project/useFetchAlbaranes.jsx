"use client";

import { useState, useEffect } from "react";

export default function useFetchAlbaranes(projectId) {
  const [albaranes, setAlbaranes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlbaranes = async () => {
    const token = localStorage.getItem("jwt");
    if (token && projectId) {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/project/${projectId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error al obtener albaranes");
        const data = await response.json();
        setAlbaranes(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAlbaranes();
  }, [projectId]);

  return { albaranes, loading, error, fetchAlbaranes };
}
