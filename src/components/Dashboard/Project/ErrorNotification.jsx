export default function ErrorNotification({ message }) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-red-600">Algo salió mal: {message}</p>
      </div>
    );
  }