import React from "react";
import { WeatherListItem } from "../../../types";

interface TomorrowLargeCardProps {
  item: WeatherListItem | undefined;
}

const TomorrowLargeCard: React.FC<TomorrowLargeCardProps> = (props) => {
  return (
    <>
      <div className="weather-lg-block__main">
        <p className="weather-lg-block__temperature">
          {props.item!.main.temp.toFixed(0)}º
        </p>
        <img
          src={`/img/weather-icons/${props.item!.weather[0].icon}.png`}
          alt={props.item!.weather[0].description}
          title={props.item!.weather[0].description}
        />
      </div>
      <div className="weather-lg-block__additional">
        <p className="weather-lg-block__feel">
          Real Feel: <span>{props.item!.main.feels_like.toFixed(0)}º</span>
        </p>
        <p className="weather-lg-block__wind">
          Wind: {props.item!.wind.deg}°,
          <span>{props.item!.wind.speed.toFixed(0)} m/s</span>
        </p>
        <p className="weather-lg-block__pressure weather-lg-block--inline">
          Pressure:{" "}
          <span>
            {props.item!.main.pressure}
            MB
          </span>
        </p>
        <p className="weather-lg-block__humidity weather-lg-block--inline">
          Humidity: <span>{props.item!.main.humidity}%</span>
        </p>
      </div>
    </>
  );
};

export default TomorrowLargeCard;
