export type TUseCityInput = {
  timeZone: string;
  coordinate: TCoordinate;
};

export type TUseCityReturn = {
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

export type TCityInput = {
  cityName: string;
  timeZone: string;
  coordinate: TCoordinate;
};

export type TGeolocationInput = string;

export type TGeolocationReturn = TCoordinate | null;
