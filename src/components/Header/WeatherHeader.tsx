import React, { useRef } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { City } from "../../types";
import ThemeSwitch from "./ThemeSwitch";

interface WeatherHeaderProps {
  onCityChoosed(city: string): void;
  city?: City;
}

interface FormValue {
  city: string;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = (props) => {
  const validationSchema = yup.object().shape({
    city: yup
      .string()
      .typeError("City should be a string!")
      .required("Enter the city!"),
  });

  const cityRef = useRef<HTMLInputElement>(null);

  const initalFormValue: FormValue = { city: "" };

  const cityChooseHandler = (values: FormValue) => {
    props.onCityChoosed(values.city);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <div className="header__menu">
            <a className="menu-icon" href="#!">
              <img
                src="/img/header/menu.svg"
                alt="Menu"
                className="menu-icon__item"
              />
            </a>
            <a href="#!" className="menu-icon">
              <img
                src="/img/header/bell.svg"
                alt="Menu"
                className="menu-icon__item"
              />
            </a>
          </div>
          <div className="header__city">
            <p>
              {props.city?.name},<span>{props.city?.country}</span>
            </p>
          </div>
          <div className="header__search search">
            <Formik
              initialValues={initalFormValue}
              validateOnChange
              onSubmit={(values: FormValue) => cityChooseHandler(values)}
              validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="city">
                    <img
                      className="search__icon"
                      src="/img/header/search.svg"
                      title="Search"
                      alt="Search"
                    />
                    <input
                      placeholder={
                        touched.city && errors.city ? errors.city : "Search"
                      }
                      type="text"
                      name="city"
                      ref={cityRef}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                    ></input>
                  </label>
                </form>
              )}
            </Formik>
          </div>
          <div className="header__theme">
            <ThemeSwitch />
          </div>
          <div className="header__logo">
            <a href="#!" className="header__logo_item">
              <img src="/img/header/avatar.png" alt="" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(WeatherHeader);
