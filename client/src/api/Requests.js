import setIsAuth from "../App";
import AuthService from "../services/AuthService.js";

class Requests {
  async registration(name, login, password, setIsAuth, setAdmin) {
    try {
      const response = await AuthService.registration(name, login, password);

      if (response.data.role === "Admin") {
        setAdmin(true);
      }
      setIsAuth(true);
      localStorage.setItem("user name", name);
      localStorage.setItem("user login", login);

      return response;
    } catch (error) {
      alert(error.response.data);
      setIsAuth(false);
    }
  }
  async login(name, login, password, setIsAuth, setSTatus, setAdmin) {
    try {
      const response = await AuthService.login(name, login, password);

      localStorage.setItem("user name", name);
      localStorage.setItem("user login", login);

      if (response.data.role === "Admin") {
        setAdmin(true);
      }
      setIsAuth(true);
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
      setIsAuth(false);
      setSTatus(false);
    }
  }
  async getAllUsers() {
    try {
      console.log("Us work");
      const response = AuthService.getAllUsers();
      return response;
    } catch (error) {
      alert("error ы бля");
      alert(error);
    }
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
      localStorage.removeItem("user name");
      localStorage.removeItem("user login");
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
