import { makeAutoObservable } from "mobx";

class DrawState {
  draw = null;
  constructor() {
    makeAutoObservable(this);
  }
  setDraw(draw) {
    this.draw = draw;
  }
}

export default new DrawState();
