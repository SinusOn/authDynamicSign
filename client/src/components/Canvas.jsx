import React, { useEffect, useRef, useState } from "react";
import '../styles/canvas.css'


const Canvas = () => {
    let arrXY = [];
    let x = 0;
    let y = 0;
    let diffX = 0;
    let diffY = 0;
    const [drawing, setDrawing] = useState(false)
    const canvasRef = useRef(null)
    const ctxRef = useRef(null)

    useEffect(()=> {
        console.log('efus')
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.lineCap = "round"
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 1
        ctxRef.current = ctx;
    }, [])

    const startDrawing = ({nativeEvent}) => {
        console.log('start drwa')

        let {offsetX, offsetY} = nativeEvent;
        console.log(`${offsetX}---`)
       setDrawing(true)
        ctxRef.current.beginPath();
    x = offsetX;
    y = offsetY;

    ctxRef.current.moveTo(x, y);
    if (arrXY.length === 0) {
      diffX = x;
      diffY = y;
      x = 0;
      y = 0;
      arrXY.push(`${x}`);
    } else {
    //   x = e.pageX - e.target.offsetLeft - diffX;
    //   y = e.pageY - e.target.offsetTop - diffY;
    x = offsetX - diffX;
    y = offsetY - diffY;
      ctxRef.current.lineTo(x + diffX, y + diffY);
      ctxRef.current.stroke();
      arrXY.push(`${x}`);
    }
    console.log(`x --- ${x} --- y ---- ${y}`)
    console.log(arrXY)
    }
    const stopDrawing = (e) => {
     setDrawing(false)

    }
    const draw = ({nativeEvent}) => {
        let {offsetLeft, offsetRight, pageX, pageY} = nativeEvent;
        if (drawing) {
            // x = e.pageX - e.target.offsetLeft - diffX;
            // y = e.pageY - e.target.offsetTop - diffY;
            x = pageX - offsetLeft - diffX;
            y = pageY - offsetRight - diffY;
            ctxRef.current.lineTo(x + diffX, y + diffY);
            ctxRef.current.stroke();
            // arrXY.push(`x: ${x}, y: ${y};`);
            arrXY.push(`${x}`);
       
          }
    }

    return (

            <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={draw} width={250} height={250}></canvas>
    
    )
}

export default Canvas