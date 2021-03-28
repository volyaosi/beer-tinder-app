import React from "react";
import cx from "classnames";

import BeerCard from "../BeerCard/BeerCard";

import "./BeerList.css";


const getAvg = (ratings) => ratings.reduce((a, b) => a + b) / ratings.length;

const BeerList = ({ beers, lastItem, handleRate, maxRating, loadMoreItems }) => {
  
  const beerListToShow = beers.slice(0, lastItem).map(
    (beer) => {
      const { myRating, ratings } = beer;
      const avgRating = getAvg(myRating ? [...ratings, myRating] : ratings);

      return (
        <BeerCard
          key={beer.id}
          {...beer}
          avgRating={avgRating}
          handleRate={handleRate}
          maxRating={maxRating}
        />
      );
    }
  );

    return (
    <div className="beer-list__container">
      {beerListToShow}
      <button
        onClick={loadMoreItems}
        className={cx("loadBtn", {
          loadBtn_hidden: lastItem >= beers.length
        })}
      >
        Load more
      </button>
    </div>
  );
}

export default BeerList;