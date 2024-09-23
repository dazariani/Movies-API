import { createContext, useState, useEffect, FormEvent } from "react";
import React from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

// TS types
interface ChildrenType {
  children: React.ReactNode;
}

interface UserType {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: number;
  username: string;
}

interface PersonalTypes {
  avatar: null | string;
  bookmarked: string[] | [];
  id: number;
  username: string;
}

interface AuthtokensType {
  access: string;
  refresh: string;
}

interface contextDataTypes {
  loginUser?: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  user: UserType | null;
  logoutUser: () => void;
  personalInfo: PersonalTypes | null;
}

// Context
const MovieContext = createContext<contextDataTypes | null>(null);

export default MovieContext;

let token = Cookies.get("accessToken");
const accessToken: UserType | null = token ? jwtDecode(token) : null;

export const MovieProvider = ({ children }: ChildrenType) => {
  const [user, setUser] = useState<UserType | null>(accessToken);
  const [authTokens, setAuthTokens] = useState<AuthtokensType | null>(null);
  const [personalInfo, setPersonalInfo] = useState<PersonalTypes | null>(null);

  //  Update token
  const updateToken = async () => {
    let refresh = Cookies.get("refreshToken");
    let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh,
      }),
    });
    let data = await response.json();

    if (response.status == 200) {
      let accessToken = data.access;
      let refreshToken = data.refresh;
      console.log(
        "new access token: ",
        accessToken,
        "new refresh token: ",
        refreshToken
      );
      let time = new Date(new Date().getTime() + 5 * 60 * 1000);
      Cookies.set("accessToken", accessToken, {
        expires: time,
        secure: true,
      });
      Cookies.set("refreshToken", refreshToken, {
        expires: 90,
        secure: true,
      });

      setAuthTokens(data);
      setUser(jwtDecode(data.access));
    } else {
      logoutUser();
    }
  };

  // Login user
  let loginUser = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
      }),
    });

    let data = await response.json();

    if (response.status == 200) {
      let accessToken = data.access;
      let refreshToken = data.refresh;
      let time = new Date(new Date().getTime() + 5 * 60 * 1000);
      Cookies.set("accessToken", accessToken, {
        expires: time,
        secure: true,
      });
      Cookies.set("refreshToken", refreshToken, { expires: 90, secure: true });

      setAuthTokens(data);
      setUser(jwtDecode(data.access));
    } else {
      alert("Something went wrong!");
    }
  };

  //  Log out user
  let logoutUser = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
    setAuthTokens(null);
  };

  // Get user's personal info
  let getUserInfo = async (tkn: string) => {
    let response = await fetch("http://127.0.0.1:8000/api/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tkn,
      },
      credentials: "include",
    });

    let data = await response.json();

    if (response.status == 200) {
      setPersonalInfo(data);
    } else {
      alert("Something went wrong!");
    }
  };

  let contextData = {
    loginUser,
    user,
    logoutUser,
    personalInfo,
  };

  // Refresh token
  let refreshInterval = 4 * 60 * 1000;
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        console.log("Token updated!");
        updateToken();
      }, refreshInterval);

      // clear interval
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    if (authTokens?.access) getUserInfo(authTokens?.access);
  }, [authTokens]);

  return (
    <MovieContext.Provider value={contextData}>
      {children}
    </MovieContext.Provider>
  );
};
