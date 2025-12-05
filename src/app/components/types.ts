export type TUseCityProps = {
  backgroundColor: string;
  animationWeather: "none" | "rainy" | "snowy";
  time: string;
  isDayTime: boolean;
  weatherIcon: string;
  greeting_letter: string;
  temperature: string;
};

export type TCoordinate = {
  lat: number;
  lon: number;
};

export type TCityProps = {
  cityName: string;
  timeZone: string;
  coordinate: TCoordinate;
};
