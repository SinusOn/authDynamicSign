import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import AuthService from "../services/AuthService";
import canvasState from '../store/canvasState.js'
import drawState from "../store/drawState";
import Draw from "../draw/Draw";
import coordinatesState from "../store/coordinatesState";
import Requests from "../api/Requests";
const User = observer((props) => {

  const [changePass, setChangePass] = useState(false)
  const canvasRef = useRef()
  const btnClearRef = useRef();
  const [continTime, setContinTime] = useState(0);
  const [referenceSing, setRefSign] = useState([])
  
  useEffect(() => {

    if (changePass) {
      canvasState.setCanvas(canvasRef.current)
    drawState.setDraw(new Draw(canvasRef.current, btnClearRef.current))
    }
 
  }, [changePass])
 return (
   <div>
    {changePass ? <>

    <div className="formreg">
    
    <button onClick={() =>{
       setChangePass(false)
       btnClearRef.current.click()
    }}>Назад</button>
    <div className="wrapCanvas"> 
        <img src="/clearCanvas.png" className="clear" ref={btnClearRef} width={20} height={20} alt="" />
        <canvas ref={canvasRef} width={250} height={250}></canvas>
        </div>
        <button onClick={async () => {
            
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
                 const changeRes = Requests.changePass(localStorage.getItem('user name'), localStorage.getItem('user login'), referenceSing, props.setIsAuth);
                 if (changePass) setChangePass(false);
              }
              
            }
           
            setContinTime(continTime + 1);

        }}>Сменить пароль</button>
    </div>
       
    </>:<>
      
    {props.isAuth ? <>
        {/* <h1>{localStorage.getItem('user name')}</h1>
      <img src="/profile.png" className="profile"/> */}
      <div className="wrap_profile">
      <div className="profile_btn">
      <button onClick={ async () => {
      AuthService.logout();

      props.setIsAuth(false);
      props.setLoading(false);
      }}>Выйти</button>
      <button onClick={() => setChangePass(true)}>Сменить пароль</button>

      {props.isAdmin ? <>
        <button onClick={() => {
        Requests.getAllUsers().then((result) => {
          console.log(result.data)
        })
      }}>Получить список пользователей</button>
      </>: <></>}

      </div>
      <div className="profile">
      <img src="/profile.png" />
      <h1>{localStorage.getItem('user name')}</h1>
      </div>
      </div>

 </>:<><h1>Вы не авторизованы</h1></>}
    </>}
   </div>
 )
})

export default User;