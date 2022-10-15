import React from "react";

interface WeatherPeriodProps {
  activePeriod: string;
  handlePeriodChange(activePeriod: string): void;
}

const WeatherPeriod: React.FC<WeatherPeriodProps> = (props) => {
  const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    props.handlePeriodChange(target.id);
  };
  return (
    <div className="weather__periods">
      <a
        href="#!"
        className={
          props.activePeriod === "today"
            ? "weather__period weather__period_active"
            : "weather__period"
        }
        onClick={clickHandler}
        id="today"
      >
        Today
      </a>
      <a
        href="#!"
        className={
          props.activePeriod === "tomorrow"
            ? "weather__period weather__period_active"
            : "weather__period"
        }
        onClick={clickHandler}
        id="tomorrow"
      >
        Tomorrow
      </a>
      <a
        href="#!"
        className={
          props.activePeriod === "5days"
            ? "weather__period weather__period_active"
            : "weather__period"
        }
        onClick={clickHandler}
        id="5days"
      >
        Next 5 days
      </a>
    </div>
  );
};

export default React.memo(WeatherPeriod);
