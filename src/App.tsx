import React, { useState, useEffect, useCallback } from "react";
import { City, Pollution, Weather, WeatherList } from "./types";
import "notyf/notyf.min.css";
import "./App.scss";
import Header from "./components/Header/WeatherHeader";
import WeatherInfo from "./components/Weather/WeatherInfo";
import WidgetList from "./components/Widgets/WidgetList";
import Loader from "./components/Loader";
import { warningToast } from "./helpers/toast";
const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState<string>("forecast");
  const [activePeriod, setActivePeriod] = useState<string>("5days");
  const [uvState, setUvState] = useState<number>(0);
  const [cityState, setCityState] = useState<City>({
    name: "Moscow",
    country: "RU",
    lat: 55.7483,
    lon: 37.6171,
  });
  const [weatherState, setWeatherState] = useState<Weather | undefined>(
    undefined
  );
  const [weatherListState, setWeatherListState] = useState<
    WeatherList | undefined
  >(undefined);
  const [airState, setAirState] = useState<Pollution | undefined>(undefined);
  const [airListState, setAirListState] = useState<Pollution | undefined>(
    undefined
  );

  const onCityChoosed = useCallback(
    (city?: string, lat?: number, lon?: number) => {
      setLoading(true);
      let url: string = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
      if (lat && lon) {
        url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
      }
      fetch(url)
        .then((res) => res.json())
        .then((json: City[]) => {
          const cityData: City = {
            name: json[0].name,
            country: json[0].country,
            lat: json[0].lat,
            lon: json[0].lon,
          };
          setCityState(cityData);
        })
        .catch((e) => {
          console.log(e);
          warningToast();
          setLoading(false);
        });
    },
    []
  );

  const handleTypeChange = (type: string) => {
    setActiveType(type);
  };

  const handlePeriodChange = (period: string) => {
    setActivePeriod(period);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((loc) => {
        onCityChoosed("", loc.coords.latitude, loc.coords.longitude);
      });
    }
  }, [onCityChoosed]);

  useEffect(() => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set(
      "x-access-token",
      process.env.REACT_APP_UV_API_KEY! + "1"
    );
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${cityState.lat}&lon=${cityState.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((weather: Weather) => {
        const weatherData: Weather = Object.assign({}, weather);
        setWeatherState(weatherData);
      })
      .catch((e) => {
        console.log(e);
        warningToast();
        setLoading(false);
      });
    fetch(
      `https://api.openuv.io/api/v1/uv?lat=${cityState.lat}&lng=${cityState.lon}`,
      {
        headers: requestHeaders,
      }
    )
      .then((res) => res.json())
      .then((weatherFull) => {
        if (weatherFull) setUvState(weatherFull.result.uv);
      })
      .catch((e) => {
        warningToast();
      });
  }, [cityState]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${cityState.lat}&lon=${cityState.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&cnt=37`
    )
      .then((res) => res.json())
      .then((weather: WeatherList) => {
        const weatherData: WeatherList = Object.assign({}, weather);
        setWeatherListState(weatherData);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        warningToast();
        setLoading(false);
      });
  }, [cityState]);

  useEffect(() => {
    if (activeType === "air") {
      fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${cityState.lat}&lon=${cityState.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((airListData: Pollution) => {
          const air: Pollution = Object.assign({}, airListData);
          setAirListState(air);
        })
        .catch((e) => {
          warningToast();
        });
      fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${cityState.lat}&lon=${cityState.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((airData: Pollution) => {
          const air: Pollution = Object.assign({}, airData);
          setAirState(air);
        })
        .catch((e) => {
          warningToast();
        });
    }
  }, [activeType, cityState]);

  return (
    <div className="App">
      <Header onCityChoosed={onCityChoosed} city={cityState} />
      <section className="main">
        <div className="container">
          <div className="main__row">
            {loading ? (
              <Loader centered={true} />
            ) : (
              <WeatherInfo
                weather={weatherState}
                weatherList={weatherListState}
                city={cityState}
                air={airState}
                airList={airListState}
                activeType={activeType}
                activePeriod={activePeriod}
                handlePeriodChange={handlePeriodChange}
                handleTypeChange={handleTypeChange}
              />
            )}
            {loading ? (
              <Loader />
            ) : (
              <WidgetList weather={weatherState} uv={uvState} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
