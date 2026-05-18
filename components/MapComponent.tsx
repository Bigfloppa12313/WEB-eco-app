"use client";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import Link from "next/link";

interface Props {
  filteredStations: any[];
  selectedStation: number | null;
  getLatestPM25: (id: number) => number;
  getMarkerColor: (pm25: number) => string;
  setSelectedStation: (id: number) => void;
}

export default function MapComponent({
  filteredStations,
  selectedStation,
  getLatestPM25,
  getMarkerColor,
  setSelectedStation,
}: Props) {
  return (
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

      {filteredStations.map((station) => {
        const pm25 = getLatestPM25(station.id);

        const isSelected =
          selectedStation === station.id;

        return (
          <CircleMarker
            key={station.id}
            center={[
              station.coordinates.lat,
              station.coordinates.lng,
            ]}
            radius={isSelected ? 18 : 12}
            pathOptions={{
              color: getMarkerColor(pm25),
              fillColor: getMarkerColor(pm25),
              fillOpacity: 0.8,
              weight: isSelected ? 5 : 2,
            }}
            eventHandlers={{
              click: () => {
                setSelectedStation(station.id);
              },
            }}
          >
            <Popup minWidth={220}>
              <div>
                <h3>{station.name}</h3>

                <p>
                  Місто: {station.city}
                </p>

                <p>
                  PM2.5: {pm25}
                </p>

                <Link
                  href={`/stations/${station.id}`}
                >
                  Детальна інформація
                </Link>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}