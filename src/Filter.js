import React from "react";

const Filter = ({ filter, theme }) => {
  return (
    <div className="filterGroup">
      <label htmlFor="filter">Filter By Platform</label>
      <select name="filter" id="filter" onChange={filter} className={theme}>
        <option value="All">All</option>
        <option value="iOS">iOS</option>
        <option value="Android">Android</option>
        <option value="MacOS">MacOS</option>
        <option value="Windows">Windows</option>
        <option value="Linux">Linux</option>
        <option value="Web">Web</option>
      </select>
    </div>
  );
};

export default Filter;
