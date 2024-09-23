import React, { useContext } from "react";
import MovieContext from "../context/MovieContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Navigation() {
  let user = useContext(MovieContext)?.user;
  let logoutUser = useContext(MovieContext)?.logoutUser;

  return (
    <Container>
      <Link to="/">Home</Link>
      <Link to="/myMovies">My Movies</Link>
      <Link to="/about">About Us</Link>
      {!user ? (
        <Link to="/login">Sign In</Link>
      ) : (
        <span onClick={logoutUser}>Log Out</span>
      )}
    </Container>
  );
}

export default Navigation;

const Container = styled.div``;
