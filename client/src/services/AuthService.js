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
    console.log("started get users");
    return api.get("/user");
  }
  static async fakeLogin(name, login, password) {
    return api.post("/fakelogin", { name, login, password });
  }
  static async fakeRegistration(name, login, password) {
    return api.post("/fakeregis", { name, login, password });
  }
  static clearCookie() {
    return api.post("/clearcookie");
  }
  static async refresh() {
    return api.get("/refresh");
  }
  static user() {
    return api.get("/user");
  }
}
