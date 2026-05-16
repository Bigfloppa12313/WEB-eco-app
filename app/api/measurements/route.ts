import { NextRequest, NextResponse } from "next/server";
import { measurements } from "@/data/mockData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const stationId = searchParams.get("stationId");

  let result = measurements;

  if (stationId) {
    result = result.filter(
      (m) => m.stationId === Number(stationId)
    );
  }

  return NextResponse.json({
    success: true,
    count: result.length,
    data: result
  });
}