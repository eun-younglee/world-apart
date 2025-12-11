import { useState, useEffect } from "react";
import type { TUseCityInput, TUseCityReturn } from "./types";

export const useCity = ({
  timeZone,
  coordinate,
}: TUseCityInput): TUseCityReturn => {
  const [time, setTime] = useState<string>("");
  const [weather, setWeather] = useState<number>(0);
  const [weatherIcon, setWeatherIcon] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("");
  const [sunriseTime, setSunriseTime] = useState<number>(0);
  const [sunsetTime, setSunsetTime] = useState<number>(0);

  // fetch weather API
  useEffect(() => {
    const fetchWeather = async () => {
      const rest = await fetch(
        `/api/weather?lat=${coordinate.lat}&lon=${coordinate.lon}`
      );

      if (!rest.ok) {
        throw new Error("Failed to fetch weather");
      }

      const data = await rest.json();
      const icon_code = data["weather"]?.[0]?.["icon"];
      const weather = data["weather"]?.[0]?.["id"];
      const temperature = data["main"]?.["temp"];
      const sunriseTime = data["sys"]?.["sunrise"];
      const sunsetTime = data["sys"]?.["sunset"];

      setWeather(weather);
      setTemperature(temperature);
      if (icon_code) {
        const iconUrl = `https://openweathermap.org/img/wn/${icon_code}@2x.png`;
        setWeatherIcon(iconUrl);
      }
      setSunriseTime(sunriseTime);
      setSunsetTime(sunsetTime);
    };
    fetchWeather();
    const interval = setInterval(fetchWeather, 7200000);
    return () => clearInterval(interval);
  }, [coordinate.lat, coordinate.lon]);

  // set time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: timeZone,
      };
      setTime(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  const hour = parseInt(time);
  const period = time.slice(-2);

  // greetings
  let greeting_letter = "";
  if (period === "AM" && hour >= 6 && hour < 12) {
    greeting_letter = "Good morning";
  } else if (period === "PM" && hour <= 6) {
    greeting_letter = "Good afternoon";
  } else {
    greeting_letter = "Good evening";
  }

  // Calculate if it's daytime based on sunrise/sunset
  const now = new Date();
  const sunrise = new Date(sunriseTime * 1000);
  const sunset = new Date(sunsetTime * 1000);
  const isDayTime = now >= sunrise && now < sunset;

  // background color
  const backgroundColor = isDayTime
    ? weather === 800 || weather == 801
      ? "bg-blue-100"
      : "bg-gray-400/70"
    : "bg-black";

  // Map weather condition codes to animation types
  const weatherConditionMap: Record<string, "none" | "rainy" | "snowy"> = {
    "2": "rainy", // Thunderstorm
    "3": "rainy", // Drizzle
    "5": "rainy", // Rain
    "6": "snowy", // Snow
  };

  const condition = weather.toString().charAt(0);
  const animationWeather = weatherConditionMap[condition] ?? "none";

  return {
    time,
    isDayTime,
    backgroundColor,
    animationWeather,
    weatherIcon,
    greeting_letter,
    temperature,
  };
};
