import { NextResponse } from "next/server";
import { stations } from "@/data/mockData";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: stations
  });
}