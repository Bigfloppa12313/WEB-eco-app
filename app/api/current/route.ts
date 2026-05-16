import { NextResponse } from "next/server";
import { measurements } from "@/data/mockData";

export async function GET() {
  const latest = measurements[0];

  return NextResponse.json({
    success: true,
    data: latest
  });
}