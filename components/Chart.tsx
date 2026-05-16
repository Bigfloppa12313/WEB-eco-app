"use client";

import { Measurement } from "@/types/environmental";

interface Props {
  data: Measurement[];
}

export default function Chart({ data }: Props) {
  return (
    <div>
      <h3>Графік показників</h3>

      {data.map((item) => (
        <div key={item.id}>
          <p>
            {item.timestamp} | PM2.5:
            {item.indicators.pm25}
          </p>
        </div>
      ))}
    </div>
  );
}