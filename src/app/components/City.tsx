import clsx from "clsx";
import { TCityInput } from "./types";
import { useCity } from "./useCity";
import Snowfall from "react-snowfall";
import { Rain } from "react-rainfall";

const City = ({ cityName, timeZone, coordinate }: TCityInput) => {
  const {
    time,
    backgroundColor,
    weatherIcon,
    greeting_letter,
    animationWeather,
    temperature,
  } = useCity({ timeZone, coordinate });

  return (
    <div
      className={clsx(
        "relative flex flex-col w-full h-full items-center justify-center overflow-hidden transition-colors duration-700 ease-in-out",
        backgroundColor
      )}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-transparent via-black/5 to-black/10 pointer-events-none" />

      {/* Weather animations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {animationWeather === "rainy" && <Rain />}
        {animationWeather === "snowy" && <Snowfall />}
      </div>

      <div className="z-10 flex flex-col items-center gap-8">
        {/* Greeting with subtle animation */}
        <div className="flex flex-col items-center gap-2 animate-fade-in">
          <span
            className={clsx(
              "text-sm sm:text-3xl font-bold tracking-[0.3em] uppercase",
              "bg-linear-to-r bg-clip-text text-transparent",
              "animate-pulse-slow",
              backgroundColor === "bg-blue-100"
                ? "from-blue-600 to-purple-700"
                : "from-purple-400 via-white to-blue-400"
            )}
          >
            {greeting_letter}
          </span>

          {/* City name with gradient */}
          <h1
            className={clsx(
              "text-2xl sm:text-6xl md:text-8xl font-black tracking-tight",
              "bg-linear-to-br bg-clip-text",
              "animate-slide-up",
              backgroundColor === "bg-blue-100" ? "text-black" : "text-white"
            )}
          >
            {cityName}
          </h1>
        </div>

        {/* Time display with enhanced styling */}
        <div className="relative py-4 animate-fade-in-delayed">
          <span
            className={clsx(
              "relative text-2xl sm:text-8xl leading-none font-black tracking-tighter tabular-nums",
              backgroundColor === "bg-blue-100" ? "text-black" : "text-white"
            )}
          >
            {time}
          </span>
        </div>

        {/* Weather card with glassmorphism */}
        <div
          className={clsx(
            "flex items-center gap-6 backdrop-blur-xl rounded-full",
            "px-10 py-5 shadow-2xl transition-all duration-300 bg-white/10",
            "hover:scale-105 hover:shadow-3xl animate-fade-in-delayed-more",
            " border border-white/20",
            backgroundColor === "bg-blue-100" ? "shadow" : " shadow-white/30"
          )}
        >
          {weatherIcon && (
            <div className="relative">
              {/* Icon glow */}
              <div
                className={clsx(
                  "absolute inset-0 blur-xl opacity-50 rounded-full",
                  backgroundColor === "bg-blue-100"
                    ? "bg-yellow-300"
                    : backgroundColor === "bg-gray-400/70"
                    ? "bg-white"
                    : "bg-white/50"
                )}
              />
              <img
                src={weatherIcon}
                alt="weather"
                className="relative w-10 h-10 sm:w-20 sm:h-20 drop-shadow-lg filter brightness-110 animate-float"
              />
            </div>
          )}

          <span
            className={clsx(
              "text-xl sm:text-6xl font-black tracking-tight",
              "bg-linear-to-br bg-clip-text text-transparent",
              backgroundColor === "bg-blue-100"
                ? "from-blue-600 to-purple-700"
                : "from-purple-400 via-white to-blue-400"
            )}
          >
            {temperature ? Math.round(Number(temperature)) : "--"} °C
          </span>
        </div>
      </div>
    </div>
  );
};

export default City;
