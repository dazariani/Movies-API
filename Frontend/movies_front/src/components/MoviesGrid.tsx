import MovieItem from "./MovieItem";
import styled from "styled-components";
import MovieContext from "../context/MovieContext";
import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function MoviesGrid() {
  let { setMovieList } = useContext(MovieContext);
  // const [searchParams, setSearchParams] = useSearchParams({ page: "1" });

  let location = useLocation();

  let {
    movieList,
    personalInfo,
    getUserInfo,
    authTokens,
    getMovies,
    loading,
    searchParams,
    setSearchParams,
    setLoading,
  } = useContext(MovieContext);

  useEffect(() => {
    if (authTokens) {
      getUserInfo(authTokens.access);
    }
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Wrapper>
      <Container
        style={
          personalInfo?.bookmarked.length == 0 && location.pathname !== "/"
            ? { display: "flex" }
            : { display: "grid" }
        }
      >
        {location.pathname == "/"
          ? movieList?.results.map((movie) => {
              return <MovieItem key={movie.id} movie={movie} />;
            })
          : personalInfo?.bookmarked.map((movie) => {
              return <MovieItem key={movie.id} movie={movie} />;
            })}
        {personalInfo?.bookmarked.length == 0 &&
          location.pathname == "/myMovies" && <p>No Movies Bookmarked</p>}
      </Container>
      {location.pathname == "/" && (
        <PaginationBox>
          {movieList?.previous && (
            <Pagination
              onClick={() => {
                if (movieList.previous) {
                  let currentPage = Number(searchParams.get("page"));
                  if (currentPage == 2) {
                    setSearchParams({});
                  } else {
                    setSearchParams({ page: String(currentPage - 1) });
                  }
                  getMovies(
                    movieList.previous.split("movies")[0] +
                      "movies/?page=" +
                      String(currentPage - 1)
                  );
                }
              }}
            >
              {"<<"} prev
            </Pagination>
          )}

          {movieList?.next && (
            <Pagination
              onClick={() => {
                if (movieList.next) {
                  let currentPage = Number(searchParams.get("page"));
                  setSearchParams({
                    page: String(currentPage + (currentPage == 0 ? 2 : 1)),
                  });
                  getMovies(
                    movieList.next.slice(0, -1) +
                      String(currentPage + (currentPage == 0 ? 2 : 1))
                  );
                }
              }}
            >
              next {">>"}
            </Pagination>
          )}
        </PaginationBox>
      )}
    </Wrapper>
  );
}

export default MoviesGrid;

const Wrapper = styled.div``;
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  row-gap: 40px;
  margin-bottom: 15px;
  justify-content: center;
`;
const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const Pagination = styled.span`
  cursor: pointer;
  color: red;
`;
