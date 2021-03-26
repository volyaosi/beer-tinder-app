import React, { Component } from "react";

class BeerCard extends Component {
  render() {
    const ratingStars = [...Array(5)].map((star, i) => {
      let starValue = i + 1;
      return (
        <label className="card__rating__radio" key={`${starValue}-beerId${this.props.el.id}`}>
          <input
            type="radio"
            name={this.props.el.name}
            value={starValue}
            onChange={(e) => {
              this.props.handleRate(this.props.el.id, e.target.value);
            }}
          />
          <span
            className={
              starValue <= this.props.el.myRating
                ? "star-active"
                : "star-inactive"
            }
          >
            ★
          </span>
        </label>
      );
    });

    return (
      <div className="card">
        <img
          className="card__image"
          src={this.props.el.src}
          alt={`${this.props.el.name} logo`}
        ></img>
        <div className="card__content">
          <h2 className="card__title">{this.props.el.name}</h2>
          <p className="card__subtitle">{this.props.el.brewery}</p>
          <div className="card__rating">
            {ratingStars}
            <p>My rating: {this.props.el.myRating}</p>
            <p className="card__rating__average">
              Average rating: {this.props.avrRating}/5.00
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default BeerCard;
