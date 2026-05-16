import { MonitoringStation, Measurement } from "@/types/environmental";

export const stations: MonitoringStation[] = [
  {
    id: 1,
    name: "Odesa Central",
    city: "Odesa",
    type: "urban",
    coordinates: {
      lat: 46.4825,
      lng: 30.7233
    }
  },
  {
    id: 2,
    name: "Kyiv Industrial",
    city: "Kyiv",
    type: "industrial",
    coordinates: {
      lat: 50.4501,
      lng: 30.5234
    }
  },
  {
    id: 3,
    name: "Lviv Eco Point",
    city: "Lviv",
    type: "urban",
    coordinates: {
      lat: 49.8397,
      lng: 24.0297
    }
  },
  {
    id: 4,
    name: "Dnipro Monitoring",
    city: "Dnipro",
    type: "industrial",
    coordinates: {
      lat: 48.4647,
      lng: 35.0462
    }
  },
  {
    id: 5,
    name: "Carpathian Rural",
    city: "Yaremche",
    type: "rural",
    coordinates: {
      lat: 48.4519,
      lng: 24.5544
    }
  }
];

export const measurements: Measurement[] = [
  {
    id: 1,
    stationId: 1,
    timestamp: "2026-05-16T10:00:00",
    indicators: {
      pm25: 18,
      pm10: 26,
      no2: 12,
      so2: 5,
      co: 0.7,
      o3: 20
    }
  },
  {
    id: 2,
    stationId: 2,
    timestamp: "2026-05-16T10:00:00",
    indicators: {
      pm25: 45,
      pm10: 61,
      no2: 33,
      so2: 18,
      co: 1.5,
      o3: 30
    }
  }
];