import { stations, measurements } from "@/data/mockData";
import Chart from "@/components/Chart";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function getStation(id: number) {
  return stations.find((s) => s.id === id);
}

export default async function StationPage({
  params,
}: Props) {
  const { id } = await params;

  const station = await getStation(Number(id));

  const stationMeasurements = measurements.filter(
    (m) => m.stationId === Number(id)
  );

  if (!station) {
    return <h1>Станцію не знайдено</h1>;
  }

  return (
    <div>
      <h1>{station.name}</h1>

      <p>Місто: {station.city}</p>
      <p>Тип: {station.type}</p>

      <Chart data={stationMeasurements} />
    </div>
  );
}