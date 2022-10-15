import React, { useState } from "react";
const ThemeSwitch: React.FC = () => {
  const [active, setActive] = useState<string>("dark");

  const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    setActive(target.id);
  };

  return (
    <div className="theme-switch">
      <a
        href="#!"
        className={
          active === "light"
            ? "theme-switch__item theme-switch__item_active"
            : "theme-switch__item"
        }
        onClick={clickHandler}
        id="light"
      >
        <img
          className="theme-switch__icon"
          src="/img/header/lighttheme.svg"
          alt=""
          onClick={clickHandler}
          id="light"
        />
      </a>
      <a
        href="#!"
        className={
          active === "dark"
            ? "theme-switch__item theme-switch__item_active"
            : "theme-switch__item"
        }
        onClick={clickHandler}
        id="dark"
      >
        <img
          className={
            active === "dark"
              ? "theme-switch__icon"
              : "theme-switch__icon theme-switch__icon--invert"
          }
          src="/img/header/darktheme.svg"
          alt=""
          onClick={clickHandler}
          id="dark"
        />
      </a>
    </div>
  );
};

export default React.memo(ThemeSwitch);
