import { NextResponse } from "next/server";
import { stations } from "@/data/mockData";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
  return NextResponse.json({
    success: true,
    data: stations
  });
  } catch (error) {
        logger.error(error);
    }
}