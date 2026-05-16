import { NextRequest, NextResponse } from "next/server";
import { measurements } from "@/data/mockData";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const stationId = searchParams.get("stationId");
    const sort = searchParams.get("sort") || "desc";

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;

    // Валідація
    if (page < 1 || limit < 1) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid pagination params"
        },
        { status: 400 }
      );
    }

    let result = [...measurements];

    // Фільтрація
    if (stationId) {
      result = result.filter(
        (m) => m.stationId === Number(stationId)
      );
    }

    // Сортування
    result.sort((a, b) => {
      if (sort === "asc") {
        return (
          new Date(a.timestamp).getTime() -
          new Date(b.timestamp).getTime()
        );
      }

      return (
        new Date(b.timestamp).getTime() -
        new Date(a.timestamp).getTime()
      );
    });

    // Пагінація
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginated = result.slice(start, end);

    return NextResponse.json({
      success: true,
      total: result.length,
      page,
      limit,
      data: paginated
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Server error"
      },
      { status: 500 }
    );
  }
}