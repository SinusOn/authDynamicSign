import React, {  useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import canvasState from '../store/canvasState.js'
import drawState from "../store/drawState";
import Draw from "../draw/Draw";
import coordinatesState from "../store/coordinatesState";
import '../styles/form.css'
import '../styles/canvas.css'
import Requests from '../api/Requests.js'


const Form = observer((props) => {

  const canvasRef = useRef()
  const btnClearRef = useRef();


  const [userName, setName] = useState('');
  const [login, setLogin] = useState('')

  const [status, setSTatus] = useState(false)
  const [reqType, setReqType] = useState('');
  const [continTime, setContinTime] = useState(0);
  const [referenceSing, setRefSign] = useState([])


  useEffect(() => {

    if (status) {
      canvasState.setCanvas(canvasRef.current)
    drawState.setDraw(new Draw(canvasRef.current, btnClearRef.current))
    }
 
  }, [status])
  
    return (
    
      <div className="formreg">
        <h1>TEST</h1>

      {
        status ? <>
        <button onClick={() => setSTatus(false)}>Назад</button>
        <div className="wrapCanvas"> 
        <img src="/clearCanvas.png" className="clear" ref={btnClearRef} width={20} height={20} alt="" />
        <canvas ref={canvasRef} width={250} height={250}></canvas>
        </div>

       
        {
          (reqType === "login") ? <button onClick={() => {
            if (!userName || !login || !coordinatesState.coordinates) {
              alert('Заполните все поля формы')
              return
            }
           Requests.login(userName, login, coordinatesState.coordinates, props.setIsAuth, setSTatus);
           btnClearRef.current.click()
         
          }}>Войти</button> : 
                    <button onClick={async () => {
                      if (!userName || !login || !coordinatesState.coordinates) {
                        alert('Заполните все поля формы')
                        return
                        }
                   
                        if (continTime === 0) {
                          setRefSign(coordinatesState.coordinates);
                          alert('Распишитесь еще 2 раза для корректной обработки вашей подписи')
                          btnClearRef.current.click()
                        }
                        if (continTime === 1) {
                          
                          const response =  Requests.compareSign(referenceSing, coordinatesState.coordinates, setContinTime)
                          console.log(response)
                          btnClearRef.current.click()
                          // alert('Распишитесь еще раз')
                        }
                        if (continTime === 2) {
                     
                          const response =  Requests.compareSign(referenceSing, coordinatesState.coordinates, setContinTime)
                          btnClearRef.current.click()
                          if (response) {
                             Requests.registration(userName, login, referenceSing, props.setIsAuth);
                          }
                          
                        }
                       
                        setContinTime(continTime + 1);
                    }}>Продолжить</button>
    
        }
        
      
        
        </> : <>    <input type="text" name="fname" placeholder="Имя" onChange={e => setName(e.target.value)}/>
      <input type="text" name="login" placeholder="Логин" onChange={e => setLogin(e.target.value)}/> 
      <div className="log">

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