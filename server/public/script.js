let arrXY = [];
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const btnClear = document.querySelector(".clear");
  canvas.width = 250;
  canvas.height = 250;
  const ctx = canvas.getContext("2d");
  let x = 0,
    y = 0,
    diffX = 0,
    diffY = 0;
  let drawing = false;

  btnClear.addEventListener("click", () => {
    ctx.clearRect(0, 0, 250, 250);
    ctx.closePath();
    arrXY = [];
  });

  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    ctx.beginPath();
    x = e.pageX - canvas.offsetLeft;
    y = e.pageY - canvas.offsetTop;
    ctx.moveTo(x, y);
    if (arrXY.length == 0) {
      diffX = x;
      diffY = y;
      x = 0;
      y = 0;
      arrXY.push(`${x}`);
    } else {
      x = e.pageX - canvas.offsetLeft - diffX;
      y = e.pageY - canvas.offsetTop - diffY;
      ctx.lineTo(x + diffX, y + diffY);
      ctx.stroke();
      arrXY.push(`${x}`);
    }
  });
  canvas.addEventListener("mousemove", (e) => {
    if (drawing) {
      x = e.pageX - canvas.offsetLeft - diffX;
      y = e.pageY - canvas.offsetTop - diffY;
      ctx.lineTo(x + diffX, y + diffY);
      ctx.stroke();
      // arrXY.push(`x: ${x}, y: ${y};`);
      arrXY.push(`${x}`);
    }
  });
  canvas.addEventListener("mouseup", (e) => {
    drawing = false;
    console.log(arrXY);
  });
});
export { arrXY as coordinates };
