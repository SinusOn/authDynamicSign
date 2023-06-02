// import AuthService from "../services/AuthService.js";
// import { Navigate } from "react-router-dom";
// export default new (class Requests {
//   async registration(name, login, password) {
//     try {
//       const response = await AuthService.registration(name, login, password);
//     } catch (error) {}
//   }
//   //   login(name, login, password, isAuth, setIsAuth) {
//   //     console.log(`полученное имя и логин - ${name}${login}`);
//   //     setIsAuth(true);
//   //   }
//   login(name, login, password, isAuth, setIsAuth) {
//     return <Navigate to={"/user"} />;
//   }
//   getUsers() {
//     console.log("Us work");
//     const resp = AuthService.getUser();
//     return resp;
//   }
// })();
import setIsAuth from "../App";
import AuthService from "../services/AuthService.js";
import { Navigate } from "react-router-dom";
class Requests {
  async registration(name, login, password) {
    try {
      const response = await AuthService.registration(name, login, password);
      const { accessToken } = response.data;
      return accessToken;

      // setAccessToken(accessToken);
      // setIsAuth(true);
      // console.log("regis acc" + aToken);
      // console.log(accessToken);
      // console.log("regis auth" + isAuth);
    } catch (error) {
      // console.log("Error registration");
      console.log(error.response?.data?.message);
    }
  }

  async login(name, login, password, setIsAuth, setAccessToken) {
    // return <Navigate to={"/user"} />;
    try {
      const response = await AuthService.login(name, login, password);
      const { accessToken } = response.data;
      setAccessToken(accessToken);
      setIsAuth(true);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  getUsers() {
    console.log("Us work");
    const response = AuthService.getUser();
    return response;
  }
  user() {
    const response = AuthService.user();
    return response;
  }

  async checkAuth() {
    try {
      const response = await AuthService.refresh();
      return setIsAuth(true);
      // return response;
    } catch (error) {
      console.log("error auth ");
    }
  }
}

export default new Requests();
// export { registration as registration, login as login, checkAuth as checkAuth };
