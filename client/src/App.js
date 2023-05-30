import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";

import "./styles/App.css";
import User from "./components/User";
import AuthPage from "./pages/AuthPage";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Routes>
      <Route
        path="/"
        element={<Form isAuth={isAuth} setIsAuth={setIsAuth} />}
      />
      <Route
        path="/user"
        element={<User isAuth={isAuth} setIsAuth={setIsAuth} />}
      />
      <Route path="/test" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
