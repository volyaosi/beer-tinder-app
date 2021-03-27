import React from "react";

export const Filter = ({ filterObj, handleFilter }) => {

  return (
    <div className="filter">
      {
        Object.keys(filterObj).map((style, i) => {
            return (
              <label>
              <input
                type="checkbox"
                onChange={(e) => handleFilter(e.target)}
                checked={filterObj[style]}
                name={style}
                key={i}
              />
              {style}
            </label>
            )
        })
      }
    </div>
  );
};
