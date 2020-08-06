import React from "react";
import { ThemeContext } from "./ThemeContext";

const Filter = ({ filter }) => {
  return (
    <ThemeContext.Consumer>
      {(context) => (
        <div className="filterGroup">
          <label htmlFor="filter">Filter By Platform</label>
          <select
            name="filter"
            id="filter"
            onChange={filter}
            className={context.theme}
          >
            <option value="All">All</option>
            <option value="iOS">iOS</option>
            <option value="Android">Android</option>
            <option value="Web">Web</option>
          </select>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

export default Filter;
