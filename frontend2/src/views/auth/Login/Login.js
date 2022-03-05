import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Title from '../../Common/title/Title'
import Label from '../../Common/label/Label'
import Input from '../../Common/inputs/Input'
import Swal from 'sweetalert2'
import './Login.css'
import loginController from '../../../controller/sessions'
import { settingsOutline } from 'ionicons/icons';
import Cookies from 'universal-cookie'
import logo from '../../../assets/img/logo.jpg'

var jwt = require('jsonwebtoken');
const cookies = new Cookies()

const Login = () =>{

    const [user, setUser] =  useState('')
    const [pass, setPass] = useState('')
    const [passError, setPassError] = useState(false)
    const [Loged, setLoged] = useState(false)

    function handleChange(name, value){
        if(name === 'usuario'){
            setUser(value)
        }
        else{
            setPassError(false)
            setPass(value)
        }
    }

    function ifMatch(param){
        if(param.user.length > 0 && param.pass.length > 0){
            Swal.fire({
                title: 'Espera un momento!',
                html: 'Estamos recopilando tus datos.',
                timerProgressBar: true,
              })
            Swal.showLoading()

            loginController.login({
                user,
                pass
            })
            .then((state) => {
                console.log(state)
                if (state.status === 200){
                    const {user, pass} = param
                    let ac = {user, pass}
                    let account = JSON.stringify(ac)
                    sessionStorage.setItem('Account', account)

                    cookies.set('token', state.token, { path: '/' });

                    setTimeout(() => {
                        Swal.close()
                        window.location.href = "/dashboard";
                    }, 1000);

                }
                else{
                    setPassError(true)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Contraseña incorrectos.',
                        footer: '<a href="./ResetPassword">Si has olvidado tu contraseña, presiona aquí.</a>'
                    })
                    setLoged(false)

                }
            })

            
        }
        else{
            Swal.fire({
                icon: 'warning',
                title: 'Campo vacío',
                text: 'Ingresa tu correo.',
              })
            setLoged(false)
        }
    }

    function handleSubmit(){
        let account = {user, pass}

        if(account){
            ifMatch(account)
        }
    }

    return(
        <div className='login-container'>

            <div className='login-content'>
                <img className="logo" src={logo} width="170" />
                <Title  title1='EL CAMIONCITO'  />
                <Title className='title-label' title2='Bienvenido al Portal'  />

                <div className="box-color">
                    <div className="box-limit">
                        <Label text='Correo'  />
                        <br />
                        <Input 
                            attribute = {{
                                id : 'usuario',
                                name : 'usuario',
                                placeholder : 'Ingrese su correo',
                                type : 'text'
                            }}
                            handleChange = {handleChange}
                        />
                        <br />
                        <Label text='Password'  />
                        <br />
                        <Input 
                            attribute = {{
                                id : 'pass',
                                name : 'pass',
                                placeholder : 'Ingrese su password',
                                type : 'password'
                            }}
                            handleChange = {handleChange}
                            param = {passError}
                        />
                        <br />

                        <div className="submit-button-container">
                            <button className="submit-button" onClick={handleSubmit}>
                                Ingresar
                            </button>
                        </div>

                        <div className="forget-button-container">
                            <Link
                             className="forget-button-container"
                                to="/ResetPassword"
                                >

                                <button className="forget-button" type="button">
                                    <i className="fas far fa-user" ></i> 
                                    Olvidé mi contraseña
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;