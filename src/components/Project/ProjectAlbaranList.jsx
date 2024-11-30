"use client";

import { useEffect, useState } from "react";
import ProjectAlbaranCard from "@/components/Project/ProjectAlbaranCard";

export default function ProjectAlbaranList({ projectId }) {
  const [albaranes, setAlbaranes] = useState([]);
  const [error, setError] = useState(null);

  // Fetch the delivery notes for a project
  const fetchDeliveryNotes = async () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/project/${projectId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener la lista de albaranes");
        }
        const data = await response.json();
        setAlbaranes(data);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchDeliveryNotes();
    }
  }, [projectId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Albaranes del Proyecto</h2>
      {albaranes.length > 0 ? (
        <div className="grid gap-4">
          {albaranes.map((albaran) => (
            <ProjectAlbaranCard key={albaran._id} albaran={albaran} />
          ))}
        </div>
      ) : (
        <p>No hay albaranes disponibles para este proyecto.</p>
      )}
    </div>
  );
}