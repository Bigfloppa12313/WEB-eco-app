"use client";

import { useMemo, useState } from "react";

import { event } from "@/lib/gtag";

import "leaflet/dist/leaflet.css";

import { stations, measurements } from "@/data/mockData";

import dynamic from "next/dynamic";

const Chart = dynamic(
  () => import("./Chart"),
  {
    ssr: false,

    loading: () => (
      <div
        style={{
          height: 400,
          background: "#f0f0f0",
          borderRadius: 10,
        }}
      />
    ),
  }
);

const MapComponent = dynamic(
  () => import("./MapComponent"),
  {
    ssr: false,
    loading: () => <p>Завантаження карти...</p>,
  }
);

export default function Dashboard() {
  const [selectedStation, setSelectedStation] =
    useState<number | null>(null);

  const [filter, setFilter] =
    useState<string>("all");

  const filteredStations = useMemo(() => {
    if (filter === "all") {
      return stations;
    }

    return stations.filter(
      (station) => station.type === filter
    );
  }, [filter]);

  const stationMeasurements =
    measurements.filter(
      (m) =>
        m.stationId === selectedStation
    );

  function getLatestPM25(
    stationId: number
  ) {
    const stationData =
      measurements.filter(
        (m) => m.stationId === stationId
      );

    return (
      stationData[stationData.length - 1]
        ?.indicators.pm25 || 0
    );
  }

  function getMarkerColor(pm25: number) {
    if (pm25 < 20) {
      return "green";
    }

    if (pm25 < 40) {
      return "orange";
    }

    return "red";
  }

  return (
    <section
      style={{
        marginTop: 30,
      }}
    >
      {/* Панель керування */}
      <div
        style={{
          display: "flex",
          gap: 15,
          marginBottom: 20,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);

            event({
              action: "apply_filter",
              category: "filters",
              label: e.target.value,
            });
          }}
          style={{
            padding: 10,
            borderRadius: 8,
          }}
        >
          <option value="all">
            Всі станції
          </option>

          <option value="urban">
            Urban
          </option>

          <option value="industrial">
            Industrial
          </option>

          <option value="rural">
            Rural
          </option>
        </select>

        <button
          onClick={() =>
            setSelectedStation(null)
          }
          style={{
            padding: "10px 15px",
            border: "none",
            borderRadius: 8,
            background: "#dc3545",
            color: "white",
            cursor: "pointer",
          }}
        >
          Скинути вибір
        </button>
      </div>

      {/* Layout */}
      <div className="dashboard-layout">
        {/* Карта */}
        <div className="card">
          <h2>
            Інтерактивна карта
          </h2>

           <MapComponent
              filteredStations={filteredStations}
              selectedStation={selectedStation}
              getLatestPM25={getLatestPM25}
              getMarkerColor={getMarkerColor}
              setSelectedStation={setSelectedStation}
            />
        </div>

        {/* Графіки */}
        <div style={{ minHeight: 450 }}>
          {selectedStation ? (
            <Chart
              data={
                stationMeasurements
              }
            />
          ) : (
            <div className="card">
              <h2>
                Оберіть станцію
              </h2>

              <p>
                Натисніть на
                маркер на карті,
                щоб побачити
                графіки.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}