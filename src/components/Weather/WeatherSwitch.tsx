import React from "react";

interface WeatherSwitchProps {
  activeType: string;
  handleTypeChange(activeType: string): void;
}

const WeatherSwitch: React.FC<WeatherSwitchProps> = (props) => {
  const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    props.handleTypeChange(target.id);
  };
  return (
    <div className="weather__switch theme-switch">
      <a
        onClick={clickHandler}
        href="#!"
        className={
          props.activeType === "forecast"
            ? "theme-switch__item theme-switch__item_active weather__type weather__type_active"
            : "theme-switch__item weather__type"
        }
        id="forecast"
      >
        Forecast
      </a>
      <a
        onClick={clickHandler}
        href="#!"
        className={
          props.activeType === "air"
            ? "theme-switch__item theme-switch__item_active weather__type weather__type_active"
            : "theme-switch__item weather__type"
        }
        id="air"
      >
        Air quality
      </a>
    </div>
  );
};

export default React.memo(WeatherSwitch);
