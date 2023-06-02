import React from "react";
import { useNavigate } from "react-router-dom";
import AuthState from "../store/authState";
import Cookies from "js-cookie";
const User = (props) => {
    const navigate = useNavigate()
function logout() {
    
    navigate('/')
    console.log('вышел')
    props.setIsAuth(false)
    console.log(props)
}
 return (
   <div>
     {Cookies.get('accessToken') ? <><h1>User me</h1>
    <button onClick={logout}>Выйти</button>
    <button onClick={() => {
            console.log(props.isAuth)
          
            console.log(props)
    }}>Какой статус авторизации и какой токен доступа</button></>:<><h1>Вы не авторизованы</h1></>}
   </div>
 )
}

export default User;