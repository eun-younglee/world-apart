import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cityName = searchParams.get("cityName");

  if (!cityName) {
    return NextResponse.json({ error: "Missing City names" }, { status: 400 });
  }

  const API_KEY = process.env.OPEN_WEATHER_API_KEY;

  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("coordinate API request failed");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch coordinate data" },
      { status: 500 }
    );
  }
}
