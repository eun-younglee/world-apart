import clsx from "clsx";
import { TCityProps } from "./types";
import { useCity } from "./useCity";
import Snowfall from "react-snowfall";
import { Rain } from "react-rainfall";

const City = ({ cityName, timeZone, coordinate }: TCityProps) => {
  const {
    time,
    backgroundColor,
    weatherIcon,
    greeting_letter,
    animationWeather,
    temperature,
  } = useCity(timeZone, coordinate);

  return (
    <div
      className={clsx(
        "relative flex flex-col w-full h-screen items-center justify-center overflow-hidden transition-colors duration-700 ease-in-out",
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
              "text-3xl font-bold tracking-[0.3em] uppercase",
              "bg-linear-to-r bg-clip-text text-transparent",
              "animate-pulse-slow",
              backgroundColor === "bg-blue-100"
                ? "from-gray-700 via-gray-900 to-gray-700"
                : "from-white via-gray-100 to-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]"
            )}
          >
            {greeting_letter}
          </span>

          {/* City name with gradient */}
          <h1
            className={clsx(
              "text-6xl md:text-8xl font-black tracking-tight",
              "bg-linear-to-br bg-clip-text text-transparent",
              "animate-slide-up",
              backgroundColor === "bg-blue-100"
                ? "from-blue-600 via-blue-800 to-purple-900"
                : "from-white via-gray-50 to-gray-200 drop-shadow-[0_4px_12px_rgba(255,255,255,0.4)]"
            )}
          >
            {cityName}
          </h1>
        </div>

        {/* Time display with enhanced styling */}
        <div className="relative py-4 animate-fade-in-delayed">
          <span
            className={clsx(
              "relative text-8xl leading-none font-black tracking-tighter tabular-nums",
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
                  backgroundColor === "bg-black"
                    ? "bg-white/50"
                    : "bg-yellow-300"
                )}
              />
              <img
                src={weatherIcon}
                alt="weather"
                className="relative w-20 h-20 drop-shadow-lg filter brightness-110 animate-float"
              />
            </div>
          )}

          <span
            className={clsx(
              "text-6xl font-black tracking-tight",
              "bg-linear-to-br bg-clip-text text-transparent",
              backgroundColor === "bg-blue-100"
                ? "from-blue-600 to-purple-700"
                : "from-white to-gray-600"
            )}
          >
            {temperature ? Math.round(Number(temperature)) : "--"} °C
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delayed {
          animation: fade-in 0.8s ease-out 0.2s backwards;
        }

        .animate-fade-in-delayed-more {
          animation: fade-in 0.8s 0.4s backwards;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }

        .animate-float {
          animation: float 3s infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default City;
