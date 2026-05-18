"use client";

import { useMemo } from "react";

import { measurements } from "@/data/mockData";

export default function Statistics() {
  const averagePM25 = useMemo(() => {
    const total = measurements.reduce(
      (sum, item) =>
        sum + item.indicators.pm25,
      0
    );

    return (
      total / measurements.length
    ).toFixed(2);
  }, []);

  const averagePM10 = useMemo(() => {
    const total = measurements.reduce(
      (sum, item) =>
        sum + item.indicators.pm10,
      0
    );

    return (
      total / measurements.length
    ).toFixed(2);
  }, []);

  return (
    <section className="card">
      <h2>Загальна статистика</h2>

      <div className="stats-grid">
        <div className="stat-item">
          <h3>Середній PM2.5</h3>

          <p>{averagePM25}</p>
        </div>

        <div className="stat-item">
          <h3>Середній PM10</h3>

          <p>{averagePM10}</p>
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