"use client";

import ClientCard from "./ClientCard";

export default function ClientsList({ clients, onSelect }) {
  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto border border-gray-300 rounded-lg shadow-md">
      <ul className="space-y-4 p-4">
        {clients.map((client) => (
          <ClientCard key={client._id} client={client} onSelect={onSelect} />
        ))}
      </ul>
    </div>
  );
}
