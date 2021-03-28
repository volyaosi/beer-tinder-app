import React from "react";

import "./Filter.css";

export const Filter = ({ filterObj, handleFilter }) => {
  return (
    <div className="filter">
      <h3>Styles:</h3>
      {Object.keys(filterObj).map((style, i) => {
        return (
          <label key={i} className="filter__item">
            <input
              type="checkbox"
              onChange={(e) => handleFilter(e.target)}
              checked={filterObj[style]}
              name={style}
              className="filter__checkbox"
            />
            {style}
          </label>
        );
      })}
    </div>
  );
};
