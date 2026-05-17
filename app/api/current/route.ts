import { NextResponse } from "next/server";
import { stations, measurements } from "@/data/mockData";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
  // Повертає останні показники для кожної станції
  const latestPerStation = stations.map((s) => {
    const stationMeasurements = measurements.filter((m) => m.stationId === s.id);

    if (stationMeasurements.length === 0) {
      return {
        stationId: s.id,
        stationName: s.name,
        latest: null,
      };
    }

    const latest = stationMeasurements.reduce((a, b) =>
      new Date(a.timestamp).getTime() > new Date(b.timestamp).getTime() ? a : b
    );

    return {
      stationId: s.id,
      stationName: s.name,
      latest,
    };
  });
  } catch (error) {
    logger.error(error);
  }
  return NextResponse.json({ success: true, data: latestPerStation });
}