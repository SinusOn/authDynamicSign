import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import User from "./components/User";

import Header from "./components/Header";
import "./styles/App.css";
import AuthService from "./services/AuthService";
import ErrorPage from "./pages/ErrorPage";
import Cookie from "js-cookie";
import Requests from "./api/Requests";
import AuthState from "./store/authState";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  // async function checkAuth() {
  //   try {
  //     const response = await AuthService.checkAuth();
  //     setIsAuth(true);
  //   } catch (error) {
  //     console.log("error auth check");
  //   }
  // }
  async function checkAuth(accessToken, setAccessToken) {
    try {
      const response = await AuthService.refresh();
      const { accessToken } = response.data;
      console.log(accessToken + " from APPP");
      setIsAuth(true);
      return accessToken;
    } catch (error) {
      console.log("error auth ");
    }
  }
  useEffect(() => {
    if (Cookie.get("accessToken")) {
      checkAuth(setIsAuth, setIsAuth);

      console.log("check work");
    }
  }, [accessToken]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              {isAuth ? (
                <User isAuth={isAuth} accessToken={accessToken} />
              ) : (
                <Form
                  isAuth={isAuth}
                  setIsAuth={setIsAuth}
                  accessToken={accessToken}
                  setAccessToken={setAccessToken}
                />
              )}
            </>
          }
        />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
