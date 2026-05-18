import { NextResponse } from "next/server";
import { stations } from "@/data/mockData";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
  return NextResponse.json({
    success: true,
    data: stations
  },
  {
    headers: {
      "Cache-Control":
        "public, s-maxage=60, stale-while-revalidate=120",
    },
  }
  );
  } catch (error) {
        logger.error(error);
    }
}