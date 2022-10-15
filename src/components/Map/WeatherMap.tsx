import React, { useRef, useCallback, Ref } from "react";
import { YMaps, Map, Placemark, ZoomControl } from "@pbe/react-yandex-maps";
import { City, Weather } from "../../types";

interface WeatherMapProps {
  cityInfo: City | undefined;
  weatherInfo: Weather | undefined;
}

const WeatherMap: React.FC<WeatherMapProps> = (props) => {
  const mapRef = useRef<any>(null);
  const setMapRef = useCallback((instance: Ref<any>) => {
    mapRef.current = instance;
  }, []);

  const fullscreenHandler = (event: React.MouseEvent) => {
    mapRef.current.container.enterFullscreen();
  };

  return (
    <div className="weather__map">
      <div className="map">
        <div className="map__row">
          <div className="map__title">Global map</div>
          <a
            href="#!"
            className="map__wide-button button"
            onClick={fullscreenHandler}
          >
            <p>View wide</p>
            <img src="/img/map/stars.svg" alt=""></img>
          </a>
        </div>
        <div className="map__global">
          <YMaps query={{ lang: "en_RU" }}>
            <Map
              instanceRef={setMapRef}
              defaultState={{
                center: [props.cityInfo!.lat, props.cityInfo!.lon],
                zoom: 6,
              }}
              width={1161}
              height={631}
            >
              <Placemark
                geometry={[props.cityInfo!.lat, props.cityInfo!.lon]}
                properties={{
                  hintContent: `City: ${props.cityInfo!.name}, ${
                    props.cityInfo?.country
                  }<br>Weather: ${props.weatherInfo?.weather[0].description}`,
                  balloonContent: `<p>Temperature: ${
                    props.weatherInfo!.main.temp
                  }º</p><p>Max Temperature: ${
                    props.weatherInfo!.main.temp_max
                  }º</p><p>Min Temperature: ${
                    props.weatherInfo!.main.temp_min
                  }º</p>
                  <p>Real Feel:${
                    props.weatherInfo!.main.feels_like
                  }º</p><p>Cloudness:${props.weatherInfo?.clouds.all}%</p>
                  <p>Wind:${props.weatherInfo?.wind.deg}º,${
                    props.weatherInfo?.wind.speed
                  }m/s</p><p>Pressure:${
                    props.weatherInfo?.main.pressure
                  }MB</p><p>Humidity:${
                    props.weatherInfo?.main.humidity
                  }</p><p>Visibility:${props.weatherInfo?.visibility}</p>`,
                }}
                options={{
                  iconLayout: "default#image",
                  iconImageHref: `/img/weather-icons/${props.weatherInfo?.weather[0].icon}.png`,
                  iconImageSize: [85, 80],
                  iconOffset: [-10, -10],
                }}
                modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
              />
              <ZoomControl />
            </Map>
          </YMaps>
        </div>
      </div>
    </div>
  );
};

export default React.memo(WeatherMap);
