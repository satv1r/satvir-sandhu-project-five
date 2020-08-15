import React from "react";
import { useTheme, useToggleTheme } from "./ThemeContext";

const ThemeSwitcher = () => {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();
  return (
    <button
      onClick={toggleTheme}
      className={"themeSwitcher " + theme}
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
  );
};

export default ThemeSwitcher;
