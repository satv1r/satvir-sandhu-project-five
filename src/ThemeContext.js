import React, { useState, createContext, useContext } from "react";

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export const useTheme = () => useContext(ThemeContext);
export const useToggleTheme = () => useContext(ThemeUpdateContext);

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
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {props.children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};
