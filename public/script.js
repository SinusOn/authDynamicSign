document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  canvas.width = 250;
  canvas.height = 250;
  const ctx = canvas.getContext("2d");
  let x = 0,
    y = 0,
    diffX = 0,
    diffY = 0;
  let drawing = false;
  let arrXY = [];

  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    ctx.beginPath();
    x = e.pageX - canvas.offsetLeft;
    // коорд х курсора относительно всего документа - левое смещение канваса от родителя
    y = e.pageY - canvas.offsetTop;
    ctx.moveTo(x, y);
    if (arrXY.length == 0) {
      diffX = x; //смещение по х от угла канваса
      diffY = y;
      x = 0;
      y = 0;
      startDrawing = false;
      arrXY.push(`x: ${x}, y: ${y};`);
    } else {
      x = e.pageX - canvas.offsetLeft - diffX;
      y = e.pageY - canvas.offsetTop - diffY;
      ctx.lineTo(x + diffX, y + diffY);
      ctx.stroke();
      arrXY.push(`x: ${x}, y: ${y};`);
    }
  });
  canvas.addEventListener("mousemove", (e) => {
    if (drawing) {
      x = e.pageX - canvas.offsetLeft - diffX;
      y = e.pageY - canvas.offsetTop - diffY;
      ctx.lineTo(x + diffX, y + diffY);
      ctx.stroke();
      arrXY.push(`x: ${x}, y: ${y};`);
    }
  });
  canvas.addEventListener("mouseup", (e) => {
    drawing = false;
    console.log(arrXY);
  });
});
