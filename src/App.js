import React, { Component } from "react";

import BeerList from "./components/BeerList/BeerList";
import { ViewControls } from "./components/ViewControls/ViewControls";
import beerData from "./beerData.js";

import "./App.css";

const MAX_RATING = 5;
const ITEMS_PER_PAGE = 3;
const formatStr = (str) => str.toLowerCase().trim();

// нужна помощь:
//1. Куда оптимальнее вынести defaultFilter
//2. Можно ли как-то упростить выбор уникальных стилей?
const defaultFilter = beerData
  .map((item) => item.style)
  .filter((item, i, arr) => arr.indexOf(item) === i)
  .reduce((obj, item) => ({ ...obj, [item]: false }), { all: true });

//3. Куда оптимальнее вынести filterView
const filterView = ({ name, style }, filter, keyword) => {
  if (filter.all) {
    return formatStr(name).includes(keyword);
  }

  for (let key in filter) {
    if (filter[key] && key === style) {
      return formatStr(name).includes(keyword);
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      beerArr: beerData,
      search: "",
      filter: defaultFilter,
      lastItem: ITEMS_PER_PAGE,
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

  loadMoreItems = () => {
    this.setState(({ lastItem }) => {
      return {
        lastItem: lastItem + ITEMS_PER_PAGE,
      };
    });
  };

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
    const beerList = this.state.beerArr.filter((beer) =>
      filterView(beer, this.state.filter, this.state.search)
    );

    return (
      <main className="App">
        <h1 className="beer-list__header">Beer List</h1>
        <ViewControls
          filterObj={this.state.filter}
          handleFilter={this.handleFilter}
          handleSearch={this.handleSearch}
        />
        <BeerList
          beers={beerList}
          lastItem={this.state.lastItem}
          handleRate={this.handleRate}
          maxRating={MAX_RATING}
          loadMoreItems={this.loadMoreItems}
        />
      </main>
    );
  }
}

export default App;