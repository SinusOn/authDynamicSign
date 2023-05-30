import React from "react"
import { useNavigate } from "react-router-dom";

const User =  (props) => {

    const navigate = useNavigate()
    function logout() {
        
        navigate('/')
        console.log('вышел')
        props.setIsAuth(false)
        console.log(props)
    }

    return (
        <div>
            <h1>User me</h1>
        
            <button onClick={logout}>Выйти</button>
            <button onClick={() => console.log(props.isAuth)}>Какой статус авторизации</button>
        </div>
    )
}
export default User;