import React from "react";

import "./Filter.css";

export const Filter = ({ filterObj, handleFilter }) => {
  return (
    <div className="filter">
      {Object.keys(filterObj).map((style, i) => {
        return (
          <label key={i}>
            <input
              type="checkbox"
              onChange={(e) => handleFilter(e.target)}
              checked={filterObj[style]}
              name={style}
              className="filter__item"
            />
            {style}
          </label>
        );
      })}
    </div>
  );
};
