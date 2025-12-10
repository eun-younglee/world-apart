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

  useEffect(() => {
    const fetchCoordinate = async () => {
      try {
        const rest = await fetch(`/api/geocode?cityName=${cityName}`);
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
    fetchCoordinate();
  }, [cityName]);
  return coordinate;
};
