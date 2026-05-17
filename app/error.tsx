"use client";

export default function Error({
  error,
}: {
  error: Error;
}) {
  return (
    <div className="card">
      <h1>500</h1>

      <p>
        Внутрішня помилка
        сервера
      </p>

      <pre>
        {error.message}
      </pre>
    </div>
  );
}