import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Title from '../../Common/title/Title'
import Label from '../../Common/label/Label'
import Input from '../../Common/inputs/Input'
import Swal from 'sweetalert2'
import loginController from '../../../controller/sessions'
import './ResetPassword.css'

const ResetPassword = () =>{

    const [user, setUser] =  useState('')
    const [cui, setCui] = useState('')
    const [fechanac, setFechanac] = useState('')
    const [passError, setPassError] = useState(false)
    const [Loged, setLoged] = useState(false)
    const [Password, setPassword] = useState('')

    function handleChange(name, value){
        if(name === 'usuario'){
            setUser(value)
        }
        else if(name === 'cui'){
            setCui(value)
        }
        else{
            setFechanac(value)
        }
    }

    function GetPassword(param){
        if(param.user.length > 0 && param.cui.length > 0 && param.fechanac.length > 0){
            // Se busca y muestra las password
            loginController.ResetPassword({
                user,
                cui,
                fechanac
            })
            .then((data) => {
                if(data === 'No data'){
                    Swal.fire('Verifique los datos ingresados.', '', 'info')
                    setPassword('')
                }
                else
                    setPassword(data.Password)
            })
        }
        else{
            let campo = param.user.length > 0 ?  
                                "fecha de nacimiento" 
                                :"CUI (DPI)" 

            Swal.fire({
                icon: 'warning',
                title: 'Campo vacío',
                text: 'El campo ' + campo + ', debe estar lleno y tener un formato válido.',
              })
            setLoged(false)
        }
    }

    function handleSubmit(){
        let account = {user, cui, fechanac}

        if(account){
            GetPassword(account)
        }
    }

    return(
        <div className='reset-container'>

            <div className='reset-content'>
                <Title className='title-label' title2='Bienvenido al Portal'  />

                <div className="box-color">
                    <div className="box-limit">
                        <Label className="msg" text="¿Olvidaste tu contraseña? la puedes recuperar facilmente 
                            ingresando los siguientes campos." 
                        />
                        <hr color='black' />
                        <br />
                        <Label text='correo'  />
                        <br />
                        <Input 
                            attribute = {{
                                id : 'usuario',
                                name : 'usuario',
                                placeholder : 'Ingrese su correo',
                                type : 'number'
                            }}
                            handleChange = {handleChange}
                        />
                        <br />
                        <Label text='Número de CUI (DPI)'  />
                        <br />
                        <Input 
                            attribute = {{
                                id : 'cui',
                                name : 'cui',
                                placeholder : 'Ingrese su número de CUI (DPI)',
                                type : 'number'
                            }}
                            handleChange = {handleChange}
                        />
                        <br />
                        <br />

                        <div className="submit-button-container">
                            <button className="submit-button" onClick={handleSubmit}>
                                Mostrar Contraseña
                            </button>
                            
                        </div>

                        <br />
                        <Label text='Contraseña '  />
                        <br />
                        <input id="pass_forget" value={Password} name="pass_forget" type="text" className='regular-style' readOnly />

                        <div className="forget-button-container">
                            <Link
                             className="forget-button-container"
                                to="/"
                                >

                                <button className="return-button" type="button">
                                    <i className="fas far fa-user" ></i> 
                                    Ingresar al sistema
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ResetPassword;