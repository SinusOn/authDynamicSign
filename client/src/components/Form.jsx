import React, {  useEffect, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { observer } from "mobx-react-lite";
import canvasState from '../store/canvasState.js'
import drawState from "../store/drawState";
import Draw from "../draw/Draw";
import coordinatesState from "../store/coordinatesState";
import '../styles/form.css'
import '../styles/canvas.css'
import Requests from '../api/Requests.js'
import AuthState from '../store/authState'
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

  // function fakeLogin(name, login, password) {
    
  // }

  

    return (
    
      <div className="formreg">

<button onClick={() => {
  console.log(props.isAuth+ " auth ")
  console.log(props.accessToken+ " token")

}}>
      Какой статус авторизации и какое токен доступа ff
    </button>
  
      {
        status ? <>
        <button onClick={() => setSTatus(false)}>Назад</button>
        <div className="wrapCanvas"> 
        <img src="/clearCanvas.png" className="clear" ref={btnClearRef} width={20} height={20} alt="" />
        <canvas ref={canvasRef} width={250} height={250}></canvas>
        </div>
   
   
       
        {
                    (reqType === "login") ? <button onClick={async () => {
                      const res = await Requests.login(userName, login, coordinatesState.coordinates, props.setIsAuth, props.setAccessToken)
                    
                      props.setIsAuth(true);
                      props.setAccessToken(res)
                     
                    }}>Войти</button> : 
                    <button onClick={async () => {
                      const token = await Requests.registration(userName, login, coordinatesState.coordinates);
                      console.log('toooken ' + token)
                      props.setIsAuth(true)
                      console.log(props.isAuth + " is auth")
                      props.setAccessToken(token);
                      console.log('acc t' + props.accessToken)
                     
                console.log(props)
                    }}>Продолжить</button>
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