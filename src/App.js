import React, { Component } from "react";
import "./App.css";

import BeerCard from "./components/BeerCard/BeerCard";
import { ViewControls } from "./components/ViewControls/ViewControls";
import beerData from "./beerData.js";

const MAX_RATING = 5;
const getAvg = (ratings) => ratings.reduce((a, b) => a + b) / ratings.length;
const formatStr = (str) => str.toLowerCase().trim();

// нужна помощь:
//1. Куда оптимальнее вынести defaultFilter
//2. Можно ли как-то упростить выбор уникальных стилей?
const defaultFilter = beerData
  .map((item) => item.style)
  .filter((item, i, arr) => arr.indexOf(item) === i)
  .reduce((obj, item) => ({ ...obj, [item]: false }), { all: true });

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      filter: defaultFilter,
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

  handleSearch = (str) => this.setState({ search: formatStr(str) });
  handleFilter = ({ name, checked }) => {
    name === "all"
      ? this.setState({ filter: defaultFilter })
      : this.setState((prevState) => {
          return {
            filter: {
              ...prevState.filter,
              all: false,
              [name]: checked,
            },
          };
        });
  };

  render() {
    const beerList = beerData.filter((beer) => {
        if (this.state.filter.all) {
          return beer.name.toLowerCase().includes(this.state.search);
        }
        for (let key in this.state.filter) {
          // console.log(key, beer.style);

          if (this.state.filter[key] && key === beer.style) {
            return beer.name.toLowerCase().includes(this.state.search);
          }
        }
      })
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
        <ViewControls
          filterObj={this.state.filter}
          handleFilter={this.handleFilter}
          handleSearch={this.handleSearch}
        />
        <div className="beer-list__container">{beerList}</div>
      </main>
    );
  }
}

export default App;
