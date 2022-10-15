export interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface WeatherInfo {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface Weather {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  name: string;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    sea_level: number;
    pressure: number;
    humidity: number;
    grnd_level: number;
    feels_like: number;
  };
  weather: WeatherInfo[];
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
}

export interface WeatherListItem {
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    temp_max: number;
    temp_kf: number;
    temp_min: number;
    sea_level: number;
    pressure: number;
    humidity: number;
    grnd_level: number;
    feels_like: number;
  };
  pop: number;
  sys: {
    pod: string;
  };
  visibility: number;
  weather: WeatherInfo[];
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
}

export interface WeatherList {
  city: {
    coord: {
      lon: number;
      lat: number;
    };
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  cnt: number;
  cod: string;
  list: WeatherListItem[];
  message: number;
}

export interface PollutionItem {
  components: {
    co: number;
    nh3: number;
    no: number;
    no2: number;
    o3: number;
    pm2_5: number;
    pm10: number;
    so2: number;
  };
  dt: number;
  main: {
    aqi: number;
  };
}

export interface Pollution {
  coord: {
    lat: number;
    lon: number;
  };
  list: PollutionItem[];
}

export interface Themes {
  dark: boolean;
  toggleDark?: () => void;
}
