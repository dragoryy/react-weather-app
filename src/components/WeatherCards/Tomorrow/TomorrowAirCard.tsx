import React from "react";
import { formatDate } from "../../../utils/dateUtils";
import { PollutionItem } from "../../../types";
interface TomorrowAirCardProps {
  item: PollutionItem;
  timezone: number | undefined;
}
const TomorrowAirCard: React.FC<TomorrowAirCardProps> = (props) => {
  return (
    <div className="weather-sm-block weather-sm-block__airp">
      <div className="weather-sm-block__date">
        <p>{formatDate(props.item.dt, props.timezone, "day", "short")}</p>
      </div>
      <div className="weather-sm-block__main">
        <p className="weather-sm-block__air">
          CO: <span>{props.item.components.co}</span>
        </p>
        <p className="weather-sm-block__air">
          NH<sub>3</sub>: <span>{props.item.components.nh3}</span>
        </p>
        <p className="weather-sm-block__air">
          NO: <span>{props.item.components.no}</span>
        </p>
        <p className="weather-sm-block__air">
          NO<sub>2</sub>: <span>{props.item.components.no2}</span>
        </p>
        <p className="weather-sm-block__air">
          O<sub>3</sub>: <span>{props.item.components.o3}</span>
        </p>
        <p className="weather-sm-block__air">
          SO<sub>2</sub>: <span>{props.item.components.so2}</span>
        </p>
      </div>
      <div className="weather-sm-block__additional weather-sm-block__air-additional">
        <p>{formatDate(props.item.dt, props.timezone)}</p>
      </div>
    </div>
  );
};

export default TomorrowAirCard;
