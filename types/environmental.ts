export interface Coordinates {
  lat: number;
  lng: number;
}

export interface MonitoringStation {
  id: number;
  name: string;
  city: string;
  type: "urban" | "industrial" | "rural";
  coordinates: Coordinates;
}

export interface AirQualityData {
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
}

export interface Measurement {
  id: number;
  stationId: number;
  timestamp: string;
  indicators: AirQualityData;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}