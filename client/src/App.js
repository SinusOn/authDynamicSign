import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import User from "./components/User";
import Header from "./components/Header";
import "./styles/App.css";
import AuthService from "./services/AuthService";
import ErrorPage from "./pages/ErrorPage";
import Cookie from "js-cookie";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const cookieToken = Cookie.get("accessToken");

  useEffect(() => {
    console.log("cook token " + cookieToken);
    if (cookieToken) {
      AuthService.refresh()
        .then(() => {
          setIsAuth(true);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
      return;
    }

    setLoading(false);
  }, [cookieToken]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              {loading ? (
                <h1>Загрузка</h1>
              ) : isAuth ? (
                <User
                  isAuth={isAuth}
                  setIsAuth={setIsAuth}
                  setLoading={setLoading}
                />
              ) : (
                <Form
                  isAuth={isAuth}
                  setIsAuth={setIsAuth}
                  setLoading={setLoading}
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
