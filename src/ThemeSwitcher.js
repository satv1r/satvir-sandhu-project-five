import React from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeSwitcher = ({ switchTheme, theme }) => {
  let buttonTheme = "";
  theme === "darkBlock"
    ? (buttonTheme = "current darkCurrent")
    : (buttonTheme = "current lightCurrent");

  return (
    <ThemeContext>
      {(context) => (
        <button
          onClick={context.toggleTheme}
          className={"themeSwitcher " + context.theme}
          id="themeSwitcher"
        >
          <div className="light">
            <i className="fas fa-sun fa-2x"></i>
          </div>
          <div className="dark">
            <i className="fas fa-moon fa-2x"></i>
          </div>
          <div className={buttonTheme} id="current"></div>
        </button>
      )}
    </ThemeContext>
  );
};

export default ThemeSwitcher;
