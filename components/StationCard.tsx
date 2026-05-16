import Link from "next/link";
import { MonitoringStation } from "@/types/environmental";

interface Props {
  station: MonitoringStation;
}

export default function StationCard({ station }: Props) {
  return (
    <div className="card">
      <h3>{station.name}</h3>

      <p>Місто: {station.city}</p>
      <p>Тип: {station.type}</p>

      <Link href={`/stations/${station.id}`}>
        Детальніше
      </Link>
    </div>
  );
}