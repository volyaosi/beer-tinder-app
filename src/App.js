import React, { Component } from "react";
import "./App.css";

import BeerCard from "./components/BeerCard/BeerCard";
import beerData from "./beerData.js";

const MAX_RATING = 5;
const getAvg = (ratings) => ratings.reduce((a, b) => a + b) / ratings.length;
const defaultStyles = beerData.map(item => item.style)
                                 .filter((item, i, arr) => arr.indexOf(item) === i)
                                 .reduce((obj, item) => ({ ...obj, [item]: false}), {all: true})

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      filter: defaultStyles,
    };
  }

  handleRate = (id, newRate) => {
    this.setState((prevState) => {
      const updatedBeerArr = prevState.beerArr.map((beer) => {
        if (beer.id === id) {
          beer.myRating = +newRate;
        }
        return beer;
      });

      return updatedBeerArr;
    });
  };

  handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    this.setState({search:keyword})
  };


  render() {
    const beerList = beerData.filter((beer) => beer.name.toLowerCase().includes(this.state.search))
      .map((beer) => {
        const { myRating, ratings } = beer;
        const avgRating = getAvg(myRating ? [...ratings, myRating] : ratings);

        return (
          <BeerCard
            key={beer.id}
            {...beer}
            avgRating={avgRating}
            handleRate={this.handleRate}
            maxRating={MAX_RATING}
          />
        );
    });

    return (
      <main className="App">
        <h1 className="beer-list__header">Beer List</h1>
        <div>
          <input
            type="text"
            placeholder="Search"
            onChange={this.handleSearch}
          />
        </div>
        <div className="beer-list__container">{beerList}</div>
      </main>
    );
  }
}

export default App;