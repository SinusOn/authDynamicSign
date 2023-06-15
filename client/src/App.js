import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import User from "./components/User";
import Header from "./components/Header";
import "./styles/App.css";
import AuthService from "./services/AuthService";
import Cookie from "js-cookie";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const cookieToken = Cookie.get("accessToken");

  useEffect(() => {
    if (cookieToken) {
      AuthService.refresh()
        .then((userData) => {
          setIsAuth(true);

          if (userData.data.role === "Admin") {
            setAdmin(true);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
      return;
    }

    setLoading(false);
  }, []);

  return (
    <div>
      <Header />
      {loading ? (
        <h1>Загрузка</h1>
      ) : isAuth ? (
        <User
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          setLoading={setLoading}
          isAdmin={isAdmin}
        />
      ) : (
        <Form
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          setLoading={setLoading}
          setAdmin={setAdmin}
        />
      )}
    </div>
  );
}

export default App;
