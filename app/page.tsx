import { stations } from "@/data/mockData";

import StationCard from "@/components/StationCard";
import Statistics from "@/components/Statistics";
import DashboardWrapper from "@/components/DashboardWrapper";

async function getStations() {
  return stations;
}

export default async function HomePage() {
  const data = await getStations();

  return (
    <div>
      <h1>
        Система моніторингу якості повітря
      </h1>

      <Statistics />

      <DashboardWrapper />

      <div
        className="grid"
        style={{ marginTop: 30 }}
      >
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