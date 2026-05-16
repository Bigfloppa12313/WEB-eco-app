"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { stations, measurements } from "@/data/mockData";

import Chart from "./Chart";

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
          onChange={(e) =>
            setFilter(e.target.value)
          }
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

          <MapContainer
            center={[49, 31]}
            zoom={6}
            style={{
              height: 800,
              width: "100%",
              borderRadius: "10px",
              marginTop: 20,
            }}
          >
            <TileLayer
              attribution="OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredStations.map(
              (station) => {
                const pm25 =
                  getLatestPM25(
                    station.id
                  );

                const isSelected =
                  selectedStation ===
                  station.id;

                return (
                  <CircleMarker
                    key={station.id}
                    center={[
                      station.coordinates.lat,
                      station.coordinates.lng,
                    ]}
                    radius={
                      isSelected
                        ? 18
                        : 12
                    }
                    pathOptions={{
                      color:
                        getMarkerColor(
                          pm25
                        ),

                      fillColor:
                        getMarkerColor(
                          pm25
                        ),

                      fillOpacity: 0.8,

                      weight: isSelected
                        ? 5
                        : 2,
                    }}
                    eventHandlers={{
                      click: () =>
                        setSelectedStation(
                          station.id
                        ),
                    }}
                  >
                    <Popup minWidth={220}>
                      <div>
                        <h3>
                          {station.name}
                        </h3>

                        <p>
                          Місто:{" "}
                          {station.city}
                        </p>

                        <p>
                          PM2.5: {pm25}
                        </p>

                        <Link
                          href={`/stations/${station.id}`}
                          style={{
                            color: "blue",
                            fontWeight:
                              "bold",
                          }}
                        >
                          Детальна
                          інформація
                        </Link>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              }
            )}
          </MapContainer>
        </div>

        {/* Графіки */}
        <div>
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