import React from "react";

import {Rating} from "../Rating/Rating";

import "./BeerCard.css";

const BeerCard = ({ id, name, myRating, avgRating, brewery, src, handleRate, maxRating }) => {
  
  const ratingProps = { id, myRating, avgRating, maxRating, handleRate };

    return (
    <div className="card">
      <img
        className="card__image"
        src={src}
        alt={`${name} logo`}
      ></img>
      <div className="card__content">
        <h2 className="card__title">{name}</h2>
        <p className="card__subtitle">{brewery}</p>
        <Rating {...ratingProps}/>
      </div>
    </div>
  );
}

export default BeerCard;