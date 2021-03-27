import React from "react";

import { Filter } from "../Filter/Filter";

import "./ViewControls.css";
 

export const ViewControls = ({ filterObj, handleFilter, handleSearch }) => {
  return (
    <div className="view-controls">
      <input
        type="text"
        name="search"
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
        className="search"
      />
      <Filter filterObj={filterObj} handleFilter={handleFilter} />
    </div>
  );
};
