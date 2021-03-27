import React from "react";

import {Filter} from "../Rating/Rating";



const ViewControls = ({ styleArr, handleFilter, handleSearch}) => {
  return (
    <input type="text" name="search" placeholder="Search" onChange={(e) => handleSearch(e.target.value)}/>
  )
}

export default ViewControls;