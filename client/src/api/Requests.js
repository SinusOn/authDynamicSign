import AuthService from "../services/AuthService.js";
import { Navigate } from "react-router-dom";
export default new (class Requests {
  async registration(name, login, password) {
    try {
      const response = await AuthService.registration(name, login, password);
    } catch (error) {}
  }
  //   login(name, login, password, isAuth, setIsAuth) {
  //     console.log(`полученное имя и логин - ${name}${login}`);
  //     setIsAuth(true);
  //   }
  login(name, login, password, isAuth, setIsAuth) {
    return <Navigate to={"/user"} />;
  }
})();
