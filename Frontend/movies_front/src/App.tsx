import Header from "./components/Header";
import styled from "styled-components";
import Home from "./pages/Home";
import About from "./pages/About";
import Mymovies from "./pages/Mymovies";
import Login from "./pages/Login";
import personal from "./pages/personal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieProvider } from "../src/context/MovieContext";

function App() {
  return (
    <Container>
      <Router>
        <MovieProvider>
          <Header />
          <Routes>
            <Route Component={Home} path="/" />
            <Route Component={Login} path="/login" />
            <Route Component={Mymovies} path="/myMovies" />
            <Route Component={About} path="/about" />
            <Route Component={personal} path="/personal" />
          </Routes>
        </MovieProvider>
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div``;
