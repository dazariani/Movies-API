import { useContext } from "react";
import MovieContext from "../context/MovieContext";
import styled from "styled-components";
import { Navigate } from "react-router-dom";

function personal() {
  let user = useContext(MovieContext)?.user;
  let personalInfo = useContext(MovieContext)?.personalInfo;

  console.log(personalInfo);

  return (
    <Container>
      <InfoBox>Personal Info</InfoBox>
      {!user && <Navigate to="/" />}
      <div>{personalInfo?.username}</div>
      <div>{personalInfo?.id}</div>
      <div>{personalInfo?.bookmarked.map((m) => m.title)}</div>
      <img
        style={{ width: "50px" }}
        src={"http://127.0.0.1:8000" + personalInfo?.avatar}
        alt="abc"
      />
    </Container>
  );
}

export default personal;

const Container = styled.div``;
const InfoBox = styled.div``;
