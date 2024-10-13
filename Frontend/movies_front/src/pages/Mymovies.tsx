import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesGrid from "../components/MoviesGrid";

function Mymovies() {
  return (
    <div>
      <MoviesGrid />
    </div>
  );
}

export default Mymovies;
