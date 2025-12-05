import { useState, useEffect } from "react";
import type { TUseCityProps, TCoordinate } from "./types";

export const useCity = (
  timeZone: string,
  coordinate: TCoordinate
): TUseCityProps => {
  const [time, setTime] = useState<string>("");
  const [weather, setWeather] = useState<Number>(0);
  const [weatherIcon, setWeatherIcon] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("");
  const OPEN_WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

  // fetch weather API
  useEffect(() => {
    const fetchWeather = async () => {
      const rest = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
      );
      const data = await rest.json();
      const icon_code = data["weather"]?.[0]?.["icon"];
      const weather = data["weather"]?.[0]?.["id"];
      const temperature = data["main"]?.["temp"];
      setWeather(weather);
      setTemperature(temperature);
      if (icon_code) {
        const iconUrl = `https://openweathermap.org/img/wn/${icon_code}@2x.png`;
        setWeatherIcon(iconUrl);
      }
    };
    fetchWeather();
    const interval = setInterval(fetchWeather, 3600000);
    return () => clearInterval(interval);
  }, [coordinate.lat, coordinate.lon, OPEN_WEATHER_API_KEY]);

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

  const isDayTime =
    (period === "AM" && hour >= 7 && hour !== 12) ||
    (period === "PM" && (hour === 12 || hour <= 6));

  // greetings
  let greeting_letter = "";
  if (period === "AM" && hour >= 6 && hour < 12) {
    greeting_letter = "Good morning";
  } else if (period === "PM" && hour <= 6) {
    greeting_letter = "Good afternoon";
  } else {
    greeting_letter = "Good evening";
  }

  // background color
  const backgroundColor = isDayTime
    ? weather === 800 || weather == 801
      ? "bg-blue-100"
      : "bg-gray-400"
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
