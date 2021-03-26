import React, { Component } from "react";
import "./App.css";

import BeerCard from "./components/BeerCard.js";
import beerData from "./beerData.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      beerArr: beerData,
    };

    this.handleRate = this.handleRate.bind(this);
  }

  handleRate(id, newRate) {
    this.setState((prevState) => {
      const updatedBeerArr = prevState.beerArr.map((beer) => {
        if (beer.id === id) {
          beer.myRating = +newRate;
        }
        return beer;
      });

      return updatedBeerArr;
    });
  }

  render() {
    const beerList = this.state.beerArr.map((beer) => {
      const totalRating = beer.rating.reduce((sum, el) => sum + el, 0);
      const beerQty = beer.rating.length;
      const avrRating = beer.myRating
        ? (totalRating + beer.myRating) / (beerQty + 1)
        : totalRating / beerQty;

      return (
        <BeerCard
          key={beer.id}
          el={beer}
          avrRating={avrRating.toFixed(2)}
          handleRate={this.handleRate}
        />
      );
    });

    return (
      <main className="App">
        <h1 className="beer-list__header">Beer List</h1>
        <div className="beer-list__container">{beerList}</div>
      </main>
    );
  }
}

export default App;
