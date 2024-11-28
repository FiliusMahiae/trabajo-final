export default function ClientCard({ client, onSelect }) {
    return (
        <li onClick={() => onSelect(client)} key={client._id} className="p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex items-center gap-4 cursor-pointer">
            {client.logo ? 
            (<img src={client.logo} alt={`${client.name} logo`} className="w-16 h-16 object-cover rounded-full" />)
            :
            (<img src="\clientPlaceholder.jpg" alt={`${client.name} logo`} className="w-16 h-16 object-cover rounded-full" />)}
            <div>
                <h3 className="text-xl font-semibold text-blue-700 hover:text-blue-800 mb-1">
                    {client.name}
                </h3>
                <p className="text-sm text-gray-700">
                    {client.cif}
                </p>
            </div>
        </li>
    );
}

