import React, { useEffect, useRef, useState } from "react";
import '../styles/form.css'
import '../styles/canvas.css'
import AuthService from "../services/AuthService.js";


const Form = (props) => {
  const [nameUser, setNameUser] = useState("");
  const [login, setLogin] = useState("");


  const canvasRef = useRef(null)
    const [arrXY, setArrXY] = useState([])
    const [diffX, setDiffX] = useState(0)
    const [diffY, setDiffY] = useState(0) 
    const [drawing, setDrawing] = useState(false)
    const ctxRef = useRef(null)
    const [CanvasClear, setClear] = useState(false)
    
    let x = 0;
    let y = 0;
    useEffect(()=> {
        console.log('use effect work')
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
            ctx.lineCap = "round"
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 1
            ctxRef.current = ctx;
            if (CanvasClear) {
              ctx.clearRect(0, 0, 250, 250);
              ctx.closePath();
              setClear(false)
            }
    }, [CanvasClear])
    const clearCanvas = () => {
     setClear(true)
    setArrXY([])
    }
    const startDrawing = ({ nativeEvent }) => {
      let { offsetX, offsetY } = nativeEvent;
      setDrawing(true);
      ctxRef.current.beginPath();
      x = offsetX;
      y = offsetY;
      ctxRef.current.moveTo(x, y);
      if (arrXY.length !== 0) {
        x = offsetX - diffX;
        y = offsetY - diffY;
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();
        setArrXY([...arrXY, x]);
      } else {
        setDiffX(x);
        setDiffY(y);
        x = 0;
        y = 0;
        setArrXY([...arrXY, x]);
      }
    }
    const stopDrawing = () => {
      setDrawing(false);
      console.log(arrXY);
      console.log(diffX);
    }
    const draw = ({ nativeEvent }) => {
      let { offsetX, offsetY } = nativeEvent;
      if (drawing) {
        x = offsetX - diffX;
        y = offsetY - diffY;
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();
        setArrXY([...arrXY, x]);
      }
    }

    return (
    <div className="formreg">
      <input type="text" name="fname" placeholder="Имя" onChange={e => setNameUser(e.target.value)}/>
      <input type="text" name="login" placeholder="Логин" onChange={e => setLogin(e.target.value)}/>

      <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={draw} width={250} height={250}></canvas>

      <button className="clear" onClick={clearCanvas}>Стереть подпись</button>
      <div className="log">
        <button type="submit" className="regis" onClick={AuthService.registration(nameUser, login, arrXY)}>Регистрация</button>
        <button type="submit" className="regis" onClick={AuthService.login(nameUser, login, arrXY)}>Авторизация</button>
      </div>
    </div>
    )
}

export default Form;