import React from "react";
import {
  City,
  Pollution,
  PollutionItem,
  Weather,
  WeatherList,
  WeatherListItem,
} from "../../types";
import { formatDate } from "../../utils/dateUtils";
import WeatherMap from "../Map/WeatherMap";
import WeatherSwitch from "./WeatherSwitch";
import WeatherPeriod from "./WeatherPeriod";
import TomorrowAirCard from "../WeatherCards/Tomorrow/TomorrowAirCard";
import TomorrowWeatherCard from "../WeatherCards/Tomorrow/TomorrowWeatherCard";
import TodayWeatherCard from "../WeatherCards/Today/TodayWeatherCard";
import TodayAirCard from "../WeatherCards/Today/TodayAirCard";
import WeekAirCard from "../WeatherCards/Week/WeekAirCard";
import WeekWeatherCard from "../WeatherCards/Week/WeekWeatherCard";
import TodayLargeAirCard from "../WeatherCards/Today/TodayLargeAirCard";
import TomorrowLargeCard from "../WeatherCards/Tomorrow/TomorrowLargeCard";
import TodayLargeCard from "../WeatherCards/Today/TodayLargeCard";
interface WeatherInfoProps {
  weather: Weather | undefined;
  weatherList: WeatherList | undefined;
  air: Pollution | undefined;
  airList: Pollution | undefined;
  city: City | undefined;
  activeType: string;
  activePeriod: string;
  handleTypeChange(activeType: string): void;
  handlePeriodChange(activePeriod: string): void;
}

const WeatherInfo: React.FC<WeatherInfoProps> = (props) => {
  function getFirstTomorrowIndex(type?: string): number {
    let index = 0;
    if (type === "air") {
      if (props.airList) {
        for (let i = 0; i < props.airList!.list.length; i++) {
          if (
            formatDate(
              props.airList!.list[i].dt,
              props.weather?.timezone,
              "day",
              "short"
            ) ===
            formatDate(
              props.weather?.dt,
              props.weather?.timezone,
              "dayafter",
              "short"
            )
          ) {
            index = i;
            return index;
          }
        }
      }
    } else {
      for (let i = 0; i < props.weatherList!.list.length; i++) {
        if (
          formatDate(
            props.weatherList!.list[i].dt,
            props.weather?.timezone,
            "day",
            "short"
          ) ===
          formatDate(
            props.weather?.dt,
            props.weather?.timezone,
            "dayafter",
            "short"
          )
        ) {
          index = i;
          return index;
        }
      }
    }
    return index;
  }
  const firstTomorrowIndex = getFirstTomorrowIndex();
  const firstAirTomorrowIndex = getFirstTomorrowIndex("air");
  const isWeather: boolean = Boolean(props.weather);
  let num: number = 0;
  let prevDay: string | number = formatDate(
    props.weather?.dt,
    props.weather?.timezone,
    "day",
    "short"
  );
  return (
    <section className="weather">
      {isWeather && (
        <>
          <div className="weather__header">
            <WeatherPeriod
              activePeriod={props.activePeriod}
              handlePeriodChange={props.handlePeriodChange}
            />
            <WeatherSwitch
              activeType={props.activeType}
              handleTypeChange={props.handleTypeChange}
            />
          </div>
          <div className="weather__info">
            <div className="weather__blocks">
              <div className="weather-lg-block">
                <div className="weather-lg-block__date">
                  <p>
                    {props.activePeriod === "tomorrow"
                      ? formatDate(
                          props.weather!.dt,
                          props.weather!.timezone,
                          "dayafter",
                          "long"
                        )
                      : formatDate(
                          props.weather!.dt,
                          props.weather!.timezone,
                          "day"
                        )}
                  </p>
                  <p>
                    {props.activePeriod === "tomorrow"
                      ? formatDate(
                          props.weatherList!.list[firstTomorrowIndex].dt,
                          props.weather!.timezone
                        )
                      : formatDate(props.weather!.dt, props.weather!.timezone)}
                  </p>
                </div>
                {props.airList &&
                props.activeType === "air" &&
                (props.activePeriod === "5days" ||
                  props.activePeriod === "today") ? (
                  <TodayLargeAirCard
                    item={props.airList?.list[firstAirTomorrowIndex]}
                  />
                ) : props.airList &&
                  props.activeType === "air" &&
                  props.activePeriod === "tomorrow" ? (
                  <TodayLargeAirCard
                    item={props.airList?.list[firstAirTomorrowIndex]}
                  />
                ) : (props.weatherList && props.activePeriod === "5days") ||
                  props.activePeriod === "today" ? (
                  <TodayLargeCard item={props.weather} />
                ) : props.weatherList && props.activePeriod === "tomorrow" ? (
                  <TomorrowLargeCard
                    item={props.weatherList?.list[firstTomorrowIndex]}
                  />
                ) : (
                  ""
                )}
              </div>
              {props.activeType === "air" && props.air && props.airList
                ? props.activePeriod === "today"
                  ? props.airList?.list.map((item: PollutionItem, i) => {
                      if (
                        (i - 2) % 6 === 1 &&
                        num < 4 &&
                        (formatDate(
                          item.dt,
                          props.weather?.timezone,
                          "day",
                          "short"
                        ) ===
                          formatDate(
                            props.weather?.dt,
                            props.weather?.timezone,
                            "day",
                            "short"
                          ) ||
                          formatDate(
                            item.dt,
                            props.weather?.timezone,
                            "day",
                            "short"
                          ) ===
                            formatDate(
                              props.weather?.dt,
                              props.weather?.timezone,
                              "dayafter",
                              "short"
                            ))
                      ) {
                        num++;
                        return (
                          <TodayAirCard
                            item={item}
                            key={item.dt}
                            timezone={props.weather?.timezone}
                          />
                        );
                      } else {
                        return "";
                      }
                    })
                  : props.activePeriod === "tomorrow"
                  ? props.airList?.list.map((item: PollutionItem, i) => {
                      if (
                        i !== firstAirTomorrowIndex &&
                        (i - 2) % 6 === 1 &&
                        num < 4 &&
                        (formatDate(
                          item.dt,
                          props.weather?.timezone,
                          "day",
                          "short"
                        ) ===
                          formatDate(
                            props.weather?.dt,
                            props.weather?.timezone,
                            "dayafterafter",
                            "short"
                          ) ||
                          formatDate(
                            item.dt,
                            props.weather?.timezone,
                            "day",
                            "short"
                          ) ===
                            formatDate(
                              props.weather?.dt,
                              props.weather?.timezone,
                              "dayafter",
                              "short"
                            ))
                      ) {
                        num++;
                        return (
                          <TomorrowAirCard
                            item={item}
                            key={item.dt}
                            timezone={props.weather?.timezone}
                          />
                        );
                      } else {
                        return "";
                      }
                    })
                  : props.activePeriod === "5days"
                  ? props.airList?.list.map((item: PollutionItem, i) => {
                      if (
                        formatDate(
                          item.dt,
                          props.weather?.timezone,
                          "day",
                          "short"
                        ) !==
                          formatDate(
                            props.weather?.dt,
                            props.weather?.timezone,
                            "day",
                            "short"
                          ) &&
                        prevDay !== formatDate(item.dt, 0, "day", "short") &&
                        num < 4
                      ) {
                        prevDay = formatDate(item.dt, 0, "day", "short");
                        num++;
                        return (
                          <WeekAirCard
                            key={item.dt}
                            item={item}
                            timezone={props.weather?.timezone}
                          />
                        );
                      } else {
                        return "";
                      }
                    })
                  : ""
                : ""}
              {props.activeType === "forecast" &&
              props.weather &&
              props.weatherList
                ? props.activePeriod === "today"
                  ? props.weatherList?.list.map((item: WeatherListItem, i) => {
                      if (
                        i % 2 === 0 &&
                        num < 4 &&
                        (formatDate(
                          item.dt,
                          props.weatherList!.city.timezone,
                          "day",
                          "short"
                        ) ===
                          formatDate(
                            props.weather?.dt,
                            props.weatherList!.city.timezone,
                            "day",
                            "short"
                          ) ||
                          formatDate(
                            item.dt,
                            props.weatherList!.city.timezone,
                            "day",
                            "short"
                          ) ===
                            formatDate(
                              props.weather?.dt,
                              props.weatherList!.city.timezone,
                              "dayafter",
                              "short"
                            ))
                      ) {
                        num++;
                        return (
                          <TodayWeatherCard
                            item={item}
                            key={item.dt}
                            timezone={props.weatherList?.city.timezone}
                          />
                        );
                      } else {
                        return "";
                      }
                    })
                  : props.activePeriod === "tomorrow"
                  ? props.weatherList?.list.map((item: WeatherListItem, i) => {
                      if (
                        i % 2 === 0 &&
                        i !== firstTomorrowIndex &&
                        num < 4 &&
                        (formatDate(
                          item.dt,
                          props.weatherList!.city.timezone,
                          "day",
                          "short"
                        ) ===
                          formatDate(
                            props.weather?.dt,
                            props.weatherList!.city.timezone,
                            "dayafter",
                            "short"
                          ) ||
                          formatDate(
                            item.dt,
                            props.weatherList!.city.timezone,
                            "day",
                            "short"
                          ) ===
                            formatDate(
                              props.weather?.dt,
                              props.weatherList!.city.timezone,
                              "dayafterafter",
                              "short"
                            ))
                      ) {
                        num++;
                        return (
                          <TomorrowWeatherCard
                            key={item.dt}
                            item={item}
                            timezone={props.weather?.timezone}
                          />
                        );
                      }
                      return "";
                    })
                  : props.activePeriod === "5days"
                  ? props.weatherList?.list.map((item: WeatherListItem) => {
                      if (
                        item.dt_txt.includes("12:00:00") &&
                        num < 4 &&
                        formatDate(
                          item.dt,
                          props.weatherList!.city.timezone,
                          "day",
                          "short"
                        ) !==
                          formatDate(
                            props.weather?.dt,
                            props.weatherList!.city.timezone,
                            "day",
                            "short"
                          )
                      ) {
                        num++;
                        return (
                          <WeekWeatherCard
                            key={item.dt}
                            item={item}
                            timezone={props.weather?.timezone}
                          />
                        );
                      } else {
                        return "";
                      }
                    })
                  : ""
                : ""}
            </div>
            <WeatherMap cityInfo={props.city} weatherInfo={props.weather} />
          </div>
        </>
      )}
    </section>
  );
};

export default React.memo(WeatherInfo);
