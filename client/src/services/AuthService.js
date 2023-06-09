import api from "../api/API.js";
export default class AuthService {
  authorized = false;
  static async registration(name, login, password) {
    return api.post("/registration", { name, login, password });
  }
  static async login(name, login, password) {
    return api.post("/login", { name, login, password });
  }
  static async logout() {
    return api.post("/logout");
  }
  static async getUser() {
    return api.get("/user");
  }

  static async refresh() {
    return api.get("/refresh");
  }
  static async compareSign(reference, input) {
    return api.post("/comparesign", { reference, input });
  }
  static async changePass(name, login, password) {
    return api.post("/changepass", { name, login, password });
  }
  static async getAllUsers() {
    return api.get("/users");
  }
  static async getRole() {
    return api.get("/getrole");
  }
}
