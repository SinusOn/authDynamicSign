import React, { useState } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Form from "./components/Form";

import "./styles/App.css";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <BrowserRouter>
      <Route path="auth">
        <Form setIsAuth={setIsAuth} />
      </Route>
      <Route path="user">
        <div>USER HELLO 6</div>
      </Route>
    </BrowserRouter>
  );
}

export default App;
