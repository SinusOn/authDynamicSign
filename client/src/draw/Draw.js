import coordinatesState from "../store/coordinatesState";

export default class Draw {
  constructor(canvas, btnClear) {
    this.canvas = canvas;
    this.btnClear = btnClear;

    this.ctx = canvas.getContext("2d");
    this.listenEvents();
  }

  listenEvents() {
    this.canvas.onmousedown = this.startDrawing.bind(this);
    this.canvas.onmouseup = this.stopDrawing.bind(this);
    this.canvas.onmousemove = this.drawProccess.bind(this);
    this.btnClear.onclick = this.clearCanvas.bind(this);
  }

  clearCanvas(e) {
    this.ctx.clearRect(0, 0, 250, 250);
    this.ctx.closePath();
    // this.arrXY = [];
    coordinatesState.setCoordinates([]);
  }
  startDrawing(e) {
    this.drawing = true;
    this.ctx.beginPath();
    this.x = e.pageX - this.canvas.offsetLeft;
    this.y = e.pageY - this.canvas.offsetTop;
    this.ctx.moveTo(this.x, this.y);
    if (coordinatesState.coordinates.length === 0) {
      this.diffX = this.x;
      this.diffY = this.y;
      this.x = 0;
      this.y = 0;
      coordinatesState.setCoordinates([
        ...coordinatesState.coordinates,
        this.x,
      ]);
    } else {
      this.x = e.pageX - this.canvas.offsetLeft - this.diffX;
      this.y = e.pageY - this.canvas.offsetTop - this.diffY;
      this.ctx.lineTo(this.x + this.diffX, this.y + this.diffY);
      this.ctx.stroke();
      coordinatesState.setCoordinates([
        ...coordinatesState.coordinates,
        this.x,
      ]);
    }
  }
  stopDrawing(e) {
    this.drawing = false;
  }
  drawProccess(e) {
    if (this.drawing) {
      this.x = e.pageX - this.canvas.offsetLeft - this.diffX;
      this.y = e.pageY - this.canvas.offsetTop - this.diffY;
      this.ctx.lineTo(this.x + this.diffX, this.y + this.diffY);
      this.ctx.stroke();
      coordinatesState.setCoordinates([
        ...coordinatesState.coordinates,
        this.x,
      ]);
    }
  }
}
