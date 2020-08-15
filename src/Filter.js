import React from "react";
import { useTheme } from "./ThemeContext";

const Filter = ({ filter }) => {
  const theme = useTheme();
  return (
    <div className="filterGroup">
      <label htmlFor="filter">Filter By Platform</label>
      <select name="filter" id="filter" onChange={filter} className={theme}>
        <option value="All">All</option>
        <option value="iOS">iOS</option>
        <option value="Android">Android</option>
        <option value="Web">Web</option>
      </select>
    </div>
  );
};

export default Filter;
