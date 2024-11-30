export default function AlbaranList({ albaranes }) {
    return (
      <ul className="space-y-4">
        {albaranes.map((albaran) => (
          <li
            key={albaran._id}
            className="p-4 border rounded-md bg-white shadow hover:shadow-lg transition-transform hover:scale-105"
          >
            <p className="text-sm text-gray-600"><strong>Formato:</strong> {albaran.format}</p>
            <p className="text-sm text-gray-600"><strong>Descripción:</strong> {albaran.description}</p>
            <p className="text-sm text-gray-600"><strong>Horas:</strong> {albaran.hours || "N/A"}</p>
            <p className="text-sm text-gray-600"><strong>Fecha:</strong> {new Date(albaran.workdate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    );
  }
  