import React from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeSwitcher = () => {
  return (
    <ThemeContext.Consumer>
      {(context) => (
        <button
          onClick={context.toggleTheme}
          className={"themeSwitcher " + context.theme}
          id="themeSwitcher"
          aria-label="switch website color theme"
        >
          <div className="light">
            <i className="fas fa-sun fa-2x"></i>
          </div>
          <div className="dark">
            <i className="fas fa-moon fa-2x"></i>
          </div>
          <div className={"switcher-background"} id="current"></div>
        </button>
      )}
    </ThemeContext.Consumer>
  );
};

export default ThemeSwitcher;
