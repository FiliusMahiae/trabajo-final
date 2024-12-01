export default function ErrorNotification({ message }) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold">{message}</p>
      </div>
    );
  }