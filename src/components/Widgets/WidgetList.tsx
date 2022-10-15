import React from "react";
import { Weather } from "../../types";
import { formatDate } from "../../utils/dateUtils";
import WindChart from "../Charts/WindChart";
import SunChart from "../Charts/SunChart";
import UvChart from "../Charts/UvChart";
interface WidgetListItems {
  weather: Weather | undefined;
  uv: number;
}

const WidgetList: React.FC<WidgetListItems> = (props) => {
  const isWeather = Boolean(props.weather);
  return (
    <section className="widgets">
      {isWeather && (
        <div className="widgets__col">
          <div className="widget">
            <div className="widget__title">Wind status</div>
            <div className="widget__chart">
              <WindChart windSpeed={props.weather?.wind.speed} />
            </div>
            <div className="widget__info">
              <p className="widget__wind">
                {props.weather?.wind.speed.toFixed(2)} <span>m/s</span>
              </p>
              <p className="widget__time">
                {formatDate(props.weather!.dt, props.weather!.timezone)}
              </p>
            </div>
          </div>
          <div className="widget">
            <div className="widget__title">Sunrise & Sunset</div>
            <div className="widget__chart widget__chart--yellow">
              <SunChart
                time={props.weather?.dt}
                timezone={props.weather?.timezone}
              />
            </div>
            <div className="widget__info">
              <div className="widget__sunrise">
                <img src="/img/widgets/sunrise.svg" alt="" />
                <p className="widget__period">Sunrise</p>
                <p className="widget__period-time">
                  {formatDate(
                    props.weather!.sys.sunrise,
                    props.weather!.timezone
                  )}
                </p>
              </div>
              <div className="widget__sunset">
                <img src="/img/widgets/sunset.svg" alt="" />
                <p className="widget__period">Sunset</p>
                <p className="widget__period-time">
                  {formatDate(
                    props.weather!.sys.sunset,
                    props.weather!.timezone
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="widget">
            <div className="widget__title">UV Index</div>
            <div className="widget__chart widget__chart--white">
              <UvChart uvIndex={props.uv} />
            </div>
            <div className="widget__info widget__info--centered">
              <p className="widget__uv">
                {props.uv.toFixed(2)}
                <span>UV</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default React.memo(WidgetList);
