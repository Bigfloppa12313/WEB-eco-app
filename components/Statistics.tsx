import { measurements } from "@/data/mockData";

function calculateAveragePM25() {
  const total = measurements.reduce(
    (sum, item) => sum + item.indicators.pm25,
    0
  );

  return (total / measurements.length).toFixed(2);
}

function calculateAveragePM10() {
  const total = measurements.reduce(
    (sum, item) => sum + item.indicators.pm10,
    0
  );

  return (total / measurements.length).toFixed(2);
}

export default function Statistics() {
  return (
    <section className="card">
      <h2>Загальна статистика</h2>

      <div className="stats-grid">
        <div className="stat-item">
          <h3>Середній PM2.5</h3>
          <p>{calculateAveragePM25()}</p>
        </div>

        <div className="stat-item">
          <h3>Середній PM10</h3>
          <p>{calculateAveragePM10()}</p>
        </div>

        <div className="stat-item">
          <h3>Кількість станцій</h3>
          <p>5</p>
        </div>

        <div className="stat-item">
          <h3>Кількість вимірювань</h3>
          <p>{measurements.length}</p>
        </div>
      </div>
    </section>
  );
}