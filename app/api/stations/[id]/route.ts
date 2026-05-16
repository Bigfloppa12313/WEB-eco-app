import { NextResponse } from "next/server";
import { stations } from "@/data/mockData";

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await context.params;

  const station = stations.find(
    (s) => s.id === Number(id)
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