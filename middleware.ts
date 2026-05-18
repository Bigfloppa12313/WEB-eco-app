import { NextRequest, NextResponse }
from "next/server";

export function middleware(
  request: NextRequest
) {
  const start = Date.now();

  const response = NextResponse.next();

  const duration =
    Date.now() - start;
  if (process.env.NODE_ENV === "development") {
  console.log(
    JSON.stringify({
      level: "info",
      method: request.method,
      url: request.url,
      userAgent:
        request.headers.get(
          "user-agent"
        ),
      duration,
      timestamp: new Date()
        .toISOString(),
    })
  );
 }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};