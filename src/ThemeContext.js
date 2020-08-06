import React, { useState, createContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState("lightBlock");

  const toggleTheme = () => {
    theme === "lightBlock" ? setTheme("darkBlock") : setTheme("lightBlock");
  };

  const body = document.body;

  theme === "darkBlock"
    ? (body.classList = "darkBody")
    : (body.classList.value = "");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
