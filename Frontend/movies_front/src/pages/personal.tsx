import React, { useContext } from "react";
import MovieContext from "../context/MovieContext";
import styled from "styled-components";
import { Navigate } from "react-router-dom";

function personal() {
  let user = useContext(MovieContext)?.user;
  let personalInfo = useContext(MovieContext)?.personalInfo;

  return (
    <Container>
      <InfoBox>Personal Info</InfoBox>
      {!user && <Navigate to="/" />}
      <div>{personalInfo?.username}</div>
      <div>{personalInfo?.id}</div>
    </Container>
  );
}

export default personal;

const Container = styled.div``;
const InfoBox = styled.div``;
