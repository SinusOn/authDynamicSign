import { makeAutoObservable } from "mobx";

class CoordinatesState {
  coordinates = [];
  constructor() {
    makeAutoObservable(this);
  }
  setCoordinates(coordinates) {
    this.coordinates = coordinates;
  }
}

export default new CoordinatesState();
