import React from "react";
import { formatDate } from "../../../utils/dateUtils";
import { WeatherListItem } from "../../../types";

interface TodayWeatherCardProps {
  item: WeatherListItem;
  timezone: number | undefined;
}
const TodayWeatherCard: React.FC<TodayWeatherCardProps> = (props) => {
  return (
    <div className="weather-sm-block">
      <div className="weather-sm-block__date">
        <p>{formatDate(props.item.dt, props.timezone, "day", "short")}</p>
      </div>
      <div className="weather-sm-block__main">
        <img
          src={`/img/weather-icons/${props.item.weather[0].icon}.png`}
          alt={props.item.weather[0].description}
          title={props.item.weather[0].description}
        />
      </div>
      <div className="weather-sm-block__additional">
        <p>{props.item.main.temp.toFixed(0)}º</p>
      </div>
    </div>
  );
};

export default TodayWeatherCard;
