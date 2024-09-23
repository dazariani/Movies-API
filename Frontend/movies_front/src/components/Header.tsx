import React, { useContext } from "react";
import styled from "styled-components";
import logo from "../assets/logo.jpg";
import Navigation from "./Navigation";
import MovieContext from "../context/MovieContext";
import { Link } from "react-router-dom";

function Header() {
  let user = useContext(MovieContext)?.user;

  return (
    <Wrapper>
      <Container>
        <LogoNavBox>
          <Logo src={logo} />
          {user && (
            <p>
              Hello <Link to="/personal">{user.username}</Link>
            </p>
          )}
          <Navigation />
        </LogoNavBox>
      </Container>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div``;
const Container = styled.div``;
const LogoNavBox = styled.div`
  display: flex;
`;
const Logo = styled.img`
  width: 80px;
`;
const Username = styled.span`
  font-size: 20px;
  color: blueviolet;
  text-transform: capitalize;
`;
