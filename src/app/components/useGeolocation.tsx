import { useState, useEffect } from "react";
import type {
  TCoordinate,
  TGeolocationInput,
  TGeolocationReturn,
} from "./types";

export const useGeolocation = (
  cityName: TGeolocationInput
): TGeolocationReturn => {
  const [coordinate, setCoordinate] = useState<TCoordinate | null>(null);
  const OPEN_WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

  useEffect(() => {
    const fetchCoordinate = async () => {
      try {
        const rest = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
        );
        const data = await rest.json();

        if (data && data.length > 0) {
          setCoordinate({
            lat: data[0].lat,
            lon: data[0].lon,
          });
        }
      } catch (error) {
        console.error("Failed to fetch coordinates: ", error);
      }
    };

    if (cityName && OPEN_WEATHER_API_KEY) {
      fetchCoordinate();
    }
  }, [cityName, OPEN_WEATHER_API_KEY]);
  return coordinate;
};
