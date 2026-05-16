import { stations } from "@/data/mockData";
import StationCard from "@/components/StationCard";
import Statistics from "@/components/Statistics";

async function getStations() {
  return stations;
}

export default async function HomePage() {
  const data = await getStations();

  return (
    <div>
      <h1>Система моніторингу якості повітря</h1>

      <Statistics />

      <div className="grid">
        {data.map((station) => (
          <StationCard
            key={station.id}
            station={station}
          />
        ))}
      </div>
    </div>
  );
}