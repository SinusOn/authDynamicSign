import setIsAuth from "../App";
import AuthService from "../services/AuthService.js";

class Requests {
  async registration(name, login, password, setIsAuth) {
    try {
      const response = await AuthService.registration(name, login, password);

      setIsAuth(true);
      localStorage.setItem("user name", name);
      localStorage.setItem("user login", name);
    } catch (error) {
      alert(error.response.data);
      setIsAuth(false);
    }
  }
  async login(name, login, password, setIsAuth, setSTatus) {
    try {
      const response = await AuthService.login(name, login, password);
      console.log(response.data);
      setIsAuth(true);
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
      setIsAuth(false);
      setSTatus(false);
    }
  }
  getUsers() {
    console.log("Us work");
    const response = AuthService.getUser();
    return response;
  }

  async checkAuth() {
    try {
      const response = await AuthService.refresh();
      return setIsAuth(true);
    } catch (error) {
      console.log("error auth ");
    }
  }
  logout() {
    try {
    } catch (error) {
      console.log(error);
    }
  }
  async compareSign(reference, input, setContinTime) {
    try {
      await AuthService.compareSign(reference, input);
      return true;
    } catch (error) {
      alert(error.response.data);
      setContinTime(0);
      return false;
    }
  }
  async changePass(name, login, password, setIsAuth) {
    try {
      const response = await AuthService.changePass(name, login, password);
      setIsAuth(true);
      return true;
    } catch (error) {
      alert("Не удалось обновить пароль");
    }
  }
}

export default new Requests();
