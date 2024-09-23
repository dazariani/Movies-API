import React, { useContext } from "react";
import styled from "styled-components";
import MovieContext from "../context/MovieContext";
import { Navigate } from "react-router-dom";

function Login() {
  let loginUser = useContext(MovieContext)?.loginUser;
  let user = useContext(MovieContext)?.user;

  return (
    <Container>
      <Form onSubmit={loginUser}>
        <UserInput type="text" name="username" placeholder="Enter username" />
        <UserInput type="text" name="password" placeholder="Enter password" />
        <Submit type="submit" />
        {user && <Navigate to="/" />}
      </Form>
    </Container>
  );
}

export default Login;

const Container = styled.div``;
const Form = styled.form``;
const UserInput = styled.input``;
const Submit = styled.input``;
