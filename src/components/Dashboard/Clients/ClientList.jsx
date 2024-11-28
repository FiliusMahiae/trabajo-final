import ClientCard from "./ClientCard";

export default function ClientsList({ clients, onSelect }) {
  return (
    <ul className="space-y-4">
      {clients.map((client) => (
        <ClientCard key={client._id} client={client} onSelect={onSelect} />
      ))}
    </ul>
  );
}
