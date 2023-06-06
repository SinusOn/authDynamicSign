import React from "react";
import AuthService from "../services/AuthService";


const User = (props) => {

 return (
   <div>

      {props.isAuth ? <><h1>{localStorage.getItem('user name')}</h1>
    <button onClick={ async () => {
  
         AuthService.logout();
    
        props.setIsAuth(false);
        props.setLoading(false);
    }}>Выйти</button>
 </>:<><h1>Вы не авторизованы</h1></>}
   </div>
 )
}

export default User;