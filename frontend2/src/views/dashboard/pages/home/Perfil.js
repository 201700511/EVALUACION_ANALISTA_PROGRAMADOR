import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLabel,
        IonItem, IonSelect, IonSelectOption, IonCard, IonCardContent, IonRow, IonCol, IonButton,
        IonInput, IonDatetime
        } from '@ionic/react';
import React, { useRef, useState, useEffect } from "react";
import Cookies from 'universal-cookie'
import MenuSuperior from '../../../Common/menu superior/MenuSuperior';
import sessions from '../../../../controller/sessions';
import Swal from 'sweetalert2'
import './Perfil.css';

var jwt = require('jsonwebtoken');
const cookies = new Cookies()

const Perfil: React.FC = () => {

  const[DatosPersonales, setDatosPersonales]= useState([]);
  const[NewDatos, setNewDatos]= useState([]);
  const reLargo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
      
  
  useEffect(() => {
    fetchCarreras();
    setNewDatos({
      Celular: 0,
      DPI: 0,
      Correo: '',
      FechaNacimiento: '',
      NOV: DatosPersonales.NOV
    })
  }, []);


  async function fetchCarreras() {
    var token = cookies.get('token')
    
    Swal.fire({
      title: 'Espera un momento!',
      html: 'Estamos recopilando tus datos personales <b></b> milliseconds.',
      timerProgressBar: true,
    })
    Swal.showLoading()

    
    sessions.GetName({
      header: token
    }).then((data) => {
      if(data){
        setDatosPersonales(data)
        console.log(DatosPersonales)
        Swal.close()
      }
    })
  }

  function UpdateDatos(dato, tipo){
    switch(tipo){
      case 1:
        NewDatos.Celular = parseInt(dato)
        break;
      case 2:
        NewDatos.DPI = parseInt(dato)
        break;
      case 3:
        NewDatos.Correo = dato
        break;
      case 4:
        var array = String(dato).split('T')
        NewDatos.FechaNacimiento = array[0]
        break;
      default:
        break;
    }
  }

  function UpdateInfoPersonal(){
    if( String(NewDatos.Celular).length !== 8 && NewDatos.Celular !== 0 ){
      Swal.fire(
        'Verifica tu celular!',
        'Recuerda que debe contener 8 dígitos.',
        'warning'
      )
      return
    }

    Swal.fire({
      title: 'Deseas actualizar tus datos?',
      text: "Verifica que los hayas escrito correctamente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        UpdateInfoPersonalAutorizado()
      }
    })
    
  }

  function UpdateInfoPersonalAutorizado(){
    var token = cookies.get('token')

    var celular = NewDatos.Celular
    sessions.UpdatePerfil({
      header: token,
      celular
    }).then((data) => {
      Swal.fire(
        'Perfecto!',
        'Tu información personal se ha modificado correctamente!',
        'success'
      )
    })
    .catch((data) => {
      console.log(data)
      Swal.fire(
        'Oops...',
        'Tu información personal no se ha podido modificar!',
        'error'
      )
    })
  }
  
  
  return (
    <IonPage>
      <MenuSuperior/>
      <hr/>
    
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonLabel className="titulo">
            <h1>
              DATOS PERSONALES
            </h1>
          </IonLabel>
        </IonToolbar>
      </IonHeader>

      <IonCard  className="txt_perfil">
        <IonItem >
          <IonCardContent>
              Estos son los datos personales actualmente en 
              nuestros sistema.
          </IonCardContent>
        </IonItem>

        <br/>
        <br/>
          <IonRow>
            <IonCol>
              <IonItem className="Select">
                <ion-label>
                  <b>
                    Nombre Completo
                  </b>
                </ion-label>
                <ion-label position="floating">
                  {DatosPersonales.Nombre}
                </ion-label>
                <IonInput  readonly placeholder={DatosPersonales.Nombre}>
                </IonInput >
              </IonItem>
            </IonCol>
            
          </IonRow>

          <br/>
          <IonRow>
            <IonCol>
              <IonItem className="Select">
                <ion-label>
                  <b>
                    Correo Electrónico
                  </b>
                </ion-label>
                <ion-label position="floating">
                  {DatosPersonales.correo}
                </ion-label>
                <IonInput   readonly placeholder={DatosPersonales.correo}>
                </IonInput >
              </IonItem>
            </IonCol>
            
          </IonRow>

          <br/>
          <IonRow>
            <IonCol>
              <IonItem className="Select">
                <ion-label>
                  <b>
                    Celular
                  </b>
                </ion-label>
                <ion-label position="floating">
                  {DatosPersonales.celular}
                </ion-label>
                <IonInput  presentation="date" onIonChange={e => {UpdateDatos(e.detail.value, 1) }}>
                </IonInput >
              </IonItem>
            </IonCol>
            
            <IonCol>
              <IonItem className="Select">
                <ion-label>
                  <b>
                    NIT
                  </b>
                </ion-label>
                <ion-label position="floating">
                  {DatosPersonales.nit}
                </ion-label>
                <IonInput  readonly placeholder={DatosPersonales.nit}>
                </IonInput >
              </IonItem>
            </IonCol>
          </IonRow>
      </IonCard>

      <br/>
      <IonButton expand="block"  className="btn_perfil" onClick={e => {UpdateInfoPersonal() }}>
        ACTUALIZAR DATOS
      </IonButton>

    </IonPage>
  );
};

export default Perfil;
