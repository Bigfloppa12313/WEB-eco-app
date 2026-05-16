import { NextRequest, NextResponse } from "next/server";
import { stations } from "@/data/mockData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const station = stations.find(
    (s) => s.id === Number(params.id)
  );

  if (!station) {
    return NextResponse.json(
      {
        success: false,
        error: "Station not found"
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: station
  });
}