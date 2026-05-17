import { NextRequest, NextResponse } from "next/server";
import { measurements } from "@/data/mockData";

function parseISODate(s: string | null) {
  if (!s) return null;
  const t = Date.parse(s);
  return Number.isNaN(t) ? null : t;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const stationId = searchParams.get("stationId");
    const sort = (searchParams.get("sort") || "desc").toLowerCase();

    const page = Math.max(Number(searchParams.get("page") || "1"), 1);
    const limitRaw = Number(searchParams.get("limit") || "10");
    const limit = Math.min(Math.max(limitRaw, 1), 100);

    const fromStr = searchParams.get("from");
    const toStr = searchParams.get("to");
    const fromTs = parseISODate(fromStr);
    const toTs = parseISODate(toStr);

    // Валідація пагінації
    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { success: false, error: "Invalid pagination params" },
        { status: 400 }
      );
    }

    // Валідація дат
    if ((fromStr && fromTs === null) || (toStr && toTs === null)) {
      return NextResponse.json(
        { success: false, error: "Invalid date format for from/to. Use ISO format." },
        { status: 400 }
      );
    }
    if (fromTs !== null && toTs !== null && fromTs > toTs) {
      return NextResponse.json(
        { success: false, error: "Invalid range: from must be <= to" },
        { status: 400 }
      );
    }

    let result = [...measurements];

    // Фільтрація по stationId
    if (stationId) {
      const idNum = Number(stationId);
      if (Number.isNaN(idNum)) {
        return NextResponse.json(
          { success: false, error: "Invalid stationId" },
          { status: 400 }
        );
      }
      result = result.filter((m) => m.stationId === idNum);
    }

    // Фільтрація по періоду
    if (fromTs !== null) {
      result = result.filter((m) => new Date(m.timestamp).getTime() >= fromTs);
    }
    if (toTs !== null) {
      result = result.filter((m) => new Date(m.timestamp).getTime() <= toTs);
    }

    // Сортування
    result.sort((a, b) => {
      const aTime = new Date(a.timestamp).getTime();
      const bTime = new Date(b.timestamp).getTime();
      return sort === "asc" ? aTime - bTime : bTime - aTime;
    });

    // Пагінація
    const total = result.length;
    const start = (page - 1) * limit;
    const paginated = result.slice(start, start + limit);

    return NextResponse.json({
      success: true,
      meta: { total, page, limit },
      data: paginated,
    });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Server error"
      },
      { status: 500 }
    );
  }
}