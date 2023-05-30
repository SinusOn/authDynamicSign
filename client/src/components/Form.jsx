import React, { useContext, useEffect, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom'
import '../styles/form.css'
import '../styles/canvas.css'

import { observer } from "mobx-react-lite";
import canvasState from '../store/canvasState.js'
import drawState from "../store/drawState";
import Draw from "../draw/Draw";
import coordinatesState from "../store/coordinatesState";
import Requests from "../api/Requests";



const Form = observer((props) => {

  const canvasRef = useRef()
  const btnClearRef = useRef();
  const navigate = useNavigate();

  const [userName, setName] = useState('')
  const [login, setLogin] = useState('')

  const [status, setSTatus] = useState(false)
  const [reqType, setReqType] = useState('');



  useEffect(() => {

    if (status) {
      canvasState.setCanvas(canvasRef.current)
    drawState.setDraw(new Draw(canvasRef.current, btnClearRef.current))
    }
 
  }, [status])

  function showPas() {
    console.log(coordinatesState.coordinates)
  }

  

    return (
    
      <div className="formreg">

<button onClick={() => console.log(props.isAuth)}>
      Какой статус авторизации
    </button>
  
      {
        status ? <>
        <button onClick={() => setSTatus(false)}>Назад</button>
        <div className="wrapCanvas"> 
        <img src="/clearCanvas.png" className="clear" ref={btnClearRef} width={20} height={20} alt="" />
        <canvas ref={canvasRef} width={250} height={250}></canvas>
        </div>
   
   
       
        {
                    (reqType === "login") ? <button onClick={ () =>  {
                        props.setIsAuth(true)
                      console.log('должно быть тру')
                      navigate('/user')
                    }}>Войти</button> : <button>Зарегистрироваться</button>
          // (reqType === "login") ? <button onClick={() => {Requests.login('alina', 'panova', 'pass', props.isAuth, props.setIsAuth)}}>Войти</button> : <button>Зарегистрироваться</button>
        }
      
        
        </> : <>    <input type="text" name="fname" placeholder="Имя" onChange={e => setName(e.target.value)}/>
      <input type="text" name="login" placeholder="Логин" onChange={e => setLogin(e.target.value)}/> 
      <div className="log">
        {/* <button type="submit" className="regis" >Регистрация</button>
        <button type="submit" className="regis" >Авторизация</button> */}
           <button type="button" className="regis" onClick={() => {
            setSTatus(true)
            setReqType('registration') ;
           }}>Регистрация</button>
        <button type="button" className="regis" onClick={() => {
          setSTatus(true)
          setReqType('login') ;
        }}>Авторизация</button>
      </div> </>
      }
      

  
      
  

    </div>
   



     

    )
})

export default Form; 