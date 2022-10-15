import React from "react";
import { PollutionItem } from "../../../types";
interface TodayLargeAirCardInterface {
  item: PollutionItem | undefined;
}

const TodayLargeAirCard: React.FC<TodayLargeAirCardInterface> = (props) => {
  return (
    <>
      <div className="weather-lg-block__additional--centered">
        <p className="weather-lg-block__air">
          CO: <span>{props.item!.components.co}</span>
        </p>
        <p className="weather-lg-block__air">
          NH<sub>3</sub>: <span>{props.item!.components.nh3}</span>
        </p>
        <p className="weather-lg-block__air">
          NO: <span>{props.item!.components.no}</span>
        </p>
        <p className="weather-lg-block__air">
          NO<sub>2</sub>: <span>{props.item!.components.no2}</span>
        </p>
        <p className="weather-lg-block__air">
          O<sub>3</sub>: <span>{props.item!.components.o3}</span>
        </p>
        <p className="weather-lg-block__air">
          SO<sub>2</sub>: <span>{props.item!.components.so2}</span>
        </p>
      </div>
    </>
  );
};

export default TodayLargeAirCard;
