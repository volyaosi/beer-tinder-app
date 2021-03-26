import React from "react";
import cx from 'classnames';

import "./Rating.css";

const generateRatingArr = (num) => {
  const arr = [];
  for (let i = 1; i <= num; i++) {
    arr.push(i);
  }
  return arr;
};

export const Rating = ({ id, myRating, avgRating, maxRating, handleRate }) => {
  return (
    <div className="rating">
        {
          generateRatingArr(maxRating).map((starValue) => (
                <label key={starValue}>
                    <input
                        type="radio"
                        className={'rating__radio'}
                        name={id}
                        value={starValue}
                        onChange={(e) => {
                            handleRate(id, e.target.value);
                        }}
                    />
                    <span
                        className={cx('star', {
                            star_active: myRating >= starValue
                        })}
                    >
                        ★
                    </span>
                </label>
            ))
        }
        <p>My rating: {myRating}</p>
        <p>
            Average rating: {avgRating.toFixed(2)}/{maxRating.toFixed(2)}
        </p>
    </div>
  );
}