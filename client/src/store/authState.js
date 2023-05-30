import { makeAutoObservable } from "mobx";

export default class AuthState {
  authorized = false;
  constructor() {
    makeAutoObservable(this);
  }
  setAuth(authorized) {
    this.authorized = authorized;
  }
}
