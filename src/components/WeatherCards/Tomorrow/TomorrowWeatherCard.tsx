import React from "react";
import { formatDate } from "../../../utils/dateUtils";
import { WeatherListItem } from "../../../types";
interface TomorrowWeatherCardProps {
  item: WeatherListItem;
  timezone: number | undefined;
}
const TomorrowWeatherCard: React.FC<TomorrowWeatherCardProps> = (props) => {
  return (
    <div className="weather-sm-block" key={props.item.dt}>
      <div className="weather-sm-block__date">
        <p>{formatDate(props.item.dt, props.timezone, "day", "short")}</p>
        <p className="weather-sm-block__datetime">
          {formatDate(props.item.dt, props.timezone)}
        </p>
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

export default TomorrowWeatherCard;
