"use client";
import clsx from "clsx";
import City from "./components";
import { useGeolocation } from "./components/useGeolocation";
import { useDDay } from "./components/useDDay";

import { BrowserView, MobileView } from "react-device-detect";

export default function Home() {
  const seoulCoordinate = useGeolocation("Seoul");
  const lilleCoordinate = useGeolocation("Lille");
  // const bsasCoordinate = useGeolocation("BuenosAires");
  // const laCoordinate = useGeolocation("LA");

  const dday = useDDay("2026/02/14");

  return (
    <>
      <BrowserView>
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

          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex gap-4">
              <div
                className={clsx(
                  "rainbow-border",
                  "backdrop-blur-xl rounded-2xl",
                  "px-6 py-4 min-w-[140px]",
                  "hover:scale-110 hover:shadow-3xl",
                  "transition-all duration-500 ease-out",
                  "shadow-2xl"
                )}
              >
                <div className="relative flex flex-col items-center">
                  <span className="text-xl text-white/70 mb-1 font-bold">
                    MEET ❤️
                  </span>
                  <span className="text-4xl font-black text-white bg-clip-text ">
                    D-{dday}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div className="flex flex-col h-screen">
          {seoulCoordinate && (
            <div className="h-1/2">
              <City
                cityName="Seoul"
                timeZone="Asia/Seoul"
                coordinate={seoulCoordinate}
              />
            </div>
          )}
          {lilleCoordinate && (
            <div className="h-1/2">
              <City
                cityName="Lille"
                timeZone="Europe/Paris"
                coordinate={lilleCoordinate}
              />
            </div>
          )}
        </div>
      </MobileView>
    </>
  );
}
