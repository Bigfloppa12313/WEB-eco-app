"use client";

import Link from "next/link";
import { MonitoringStation } from "@/types/environmental";
import { event } from "@/lib/gtag";
interface Props {
  station: MonitoringStation;
}

export default function StationCard({ station }: Props) {
  return (
    <div className="card">
      <h3>{station.name}</h3>

      <p>Місто: {station.city}</p>
      <p>Тип: {station.type}</p>

      <Link href={`/stations/${station.id}`}onClick={() =>
  event({
    action: "view_station",
    category: "station",
    label: station.name,
  })
}>
        Детальніше
      </Link>
    </div>
  );
}