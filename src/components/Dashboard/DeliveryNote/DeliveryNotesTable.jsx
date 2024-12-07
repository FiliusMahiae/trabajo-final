"use client";

import { useState } from "react";
import DeliveryNoteCard from "./DeliveryNoteCard";

export default function DeliveryNotesTable({ deliveryNotes: initialDeliveryNotes }) {
  const [deliveryNotes, setDeliveryNotes] = useState(initialDeliveryNotes);

  const handleDelete = (deletedNoteId) => {
    setDeliveryNotes((prevNotes) => prevNotes.filter((note) => note._id !== deletedNoteId));
  };

  return (
    <div className="overflow-x-auto w-full shadow-md rounded-lg border border-gray-200">
      <div className="min-w-full bg-white">
        <div className="bg-gray-100 grid grid-cols-6 gap-4 px-4 py-3 font-semibold text-gray-700">
          <div className="w-1/6">Código</div>
          <div className="w-1/6">Creación</div>
          <div className="w-1/6">Descripción</div>
          <div className="w-1/6">Horas</div>
          <div className="w-1/6">Estado</div>
          <div className="w-1/6">Acciones</div>
        </div>
        {deliveryNotes.map((note, index) => (
          <DeliveryNoteCard
            key={note._id}
            note={note}
            index={index}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
