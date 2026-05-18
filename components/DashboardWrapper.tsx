"use client";

import dynamic from "next/dynamic";

const Dashboard = dynamic(
  () => import("./Dashboard"),
  {
    ssr: false,

    loading: () => (
      <div
        style={{
          height: 900,
          background: "#e5e5e5",
          borderRadius: 10,
          marginTop: 30,
        }}
      />
    ),
  }
);

export default function DashboardWrapper() {
  return <Dashboard />;
}