import React from 'react';
import '../styles/form.css'
import '../styles/canvas.css'
const Form = () => {
    return (
    <div className="formreg">
      <input type="text" name="fname" placeholder="Имя" />
      <input type="text" name="login" placeholder="Логин" />


      {/* <canvas width={250} height={250} className='f'></canvas> */}
      <button className="clear">Стереть подпись</button>
      <div className="log">
        <button type="submit" className="regis">Регистрация</button>
        <button type="submit" className="regis">Авторизация</button>
      </div>
    </div>
    )
}

export default Form;