"use client";
import City from "./components";
import { useGeolocation } from "./components/useGeolocation";

export default function Home() {
  const seoulCoordinate = useGeolocation("Seoul");
  const lilleCoordinate = useGeolocation("Lille");
  // const bsasCoordinate = useGeolocation("BuenosAires");
  // const laCoordinate = useGeolocation("LA");

  return (
    <div className="flex h-screen">
      {seoulCoordinate && (
        <City
          cityName="Seoul"
          timeZone="Asia/Seoul"
          coordinate={seoulCoordinate}
        />
      )}
      {lilleCoordinate && (
        <City
          cityName="Lille"
          timeZone="Europe/Paris"
          coordinate={lilleCoordinate}
        />
      )}
      {/* {bsasCoordinate && (
        <City
          cityName="Buenos Aires"
          timeZone="America/Buenos_Aires"
          coordinate={bsasCoordinate}
        />
      )} */}
      {/* {laCoordinate && (
        <City
          cityName="Los Angeles"
          timeZone="America/Los_Angeles"
          coordinate={laCoordinate}
        />
      )} */}
    </div>
  );
}
