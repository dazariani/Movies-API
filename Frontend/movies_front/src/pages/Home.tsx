import React, { useContext, useEffect } from "react";
import MovieContext from "../context/MovieContext";
import MoviesGrid from "../components/MoviesGrid";
import styled from "styled-components";

function Home() {
  // let { searchParams, setSearchParams, getMovies } = useContext(MovieContext);

  return (
    <Container>
      <MoviesGrid />
    </Container>
  );
}

export default Home;

const Container = styled.div``;
