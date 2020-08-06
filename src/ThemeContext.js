import React, { useState, createContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState("lightBlock");

  const toggleTheme = () => {
    theme === "lightBlock" ? setTheme("darkBlock") : setTheme("lightBlock");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
