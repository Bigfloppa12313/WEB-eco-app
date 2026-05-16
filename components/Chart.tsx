"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

import { Measurement } from "@/types/environmental";

interface Props {
  data: Measurement[];
}

export default function Chart({ data }: Props) {
  const chartData = data.map((item) => ({
    time: new Date(item.timestamp).toLocaleTimeString(),
    pm25: item.indicators.pm25,
    pm10: item.indicators.pm10
  }));

  return (
    <div style={{ width: "100%", height: 400, marginTop: 30 }}>
      <h2>Графік якості повітря</h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pm25" stroke="#8884d8" />
          <Line type="monotone" dataKey="pm10" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}