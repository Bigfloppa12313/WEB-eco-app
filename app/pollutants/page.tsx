export const dynamic = "force-static";

const pollutants = [
  "PM2.5",
  "PM10",
  "NO2",
  "SO2",
  "CO",
  "O3"
];

export default function PollutantsPage() {
  return (
    <div>
      <h1>Типи забруднювачів</h1>

      <ul>
        {pollutants.map((pollutant) => (
          <li key={pollutant}>
            {pollutant}
          </li>
        ))}
      </ul>
    </div>
  );
}