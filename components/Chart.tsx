"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { Measurement } from "@/types/environmental";

interface Props {
  data: Measurement[];
}

export default function Chart({
  data,
}: Props) {
  const chartData = data.map((item) => ({
    time: new Date(
      item.timestamp
    ).toLocaleTimeString(),

    pm25: item.indicators.pm25,
    pm10: item.indicators.pm10,
    no2: item.indicators.no2,
    so2: item.indicators.so2,
    co: item.indicators.co,
    o3: item.indicators.o3,
  }));

  // Дані для кругової діаграми
  const latest =
    data[data.length - 1];

  const pieData = latest
    ? [
        {
          name: "PM2.5",
          value: latest.indicators.pm25,
        },
        {
          name: "PM10",
          value: latest.indicators.pm10,
        },
        {
          name: "NO2",
          value: latest.indicators.no2,
        },
        {
          name: "SO2",
          value: latest.indicators.so2,
        },
        {
          name: "CO",
          value: latest.indicators.co,
        },
        {
          name: "O3",
          value: latest.indicators.o3,
        },
      ]
    : [];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A020F0",
    "#FF4560",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 40,
      }}
    >
      {/* Лінійний графік */}
      <div className="card">
        <h2>
          Динаміка забруднення
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="pm25"
              stroke="#8884d8"
              name="PM2.5"
            />

            <Line
              type="monotone"
              dataKey="pm10"
              stroke="#82ca9d"
              name="PM10"
            />

            <Line
              type="monotone"
              dataKey="no2"
              stroke="#ff7300"
              name="NO2"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Стовпчикова діаграма */}
      <div className="card">
        <h2>
          Порівняння показників
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="pm25"
              fill="#8884d8"
              name="PM2.5"
            />

            <Bar
              dataKey="pm10"
              fill="#82ca9d"
              name="PM10"
            />

            <Bar
              dataKey="no2"
              fill="#ff7300"
              name="NO2"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Кругова діаграма */}
      <div className="card">
        <h2>
          Структура забруднення
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {pieData.map(
                (entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}