import {IonButtons,  IonHeader, IonMenuButton, IonPage,  IonToolbar, IonLabel,
        IonItem, IonCard
        } from '@ionic/react';
import React, { useRef, useState, useEffect } from "react";
import ControllerDashboard from '../../../../../controller/sessions'
import Swal from 'sweetalert2'
import Table from '../../../../Common/table/Table';
import MenuSuperior from '../../../../Common/menu superior/MenuSuperior';
import Cookies from 'universal-cookie'
import './Rep1.css';

var jwt = require('jsonwebtoken');
const cookies = new Cookies()

const Rep1: React.FC = () => {

  const[DatosReporte1, setDatosReporte1]= useState([]);
  const[paramsReporte1, setparamsReporte1]= useState([]);
  
  useEffect(() => {
    fetchReporte1()
  }, []);
  
  async function fetchReporte1() {
      let array_temporal = []
      var token = cookies.get('token')

      ControllerDashboard.REP1({
        header: token
      }).then((data) => {
        if(data.length > 0){
          data.map(element => {
            array_temporal.push({
              dato0: element.nit,
              dato1: element.nombre,
              dato2: element.celular,
              dato3: element.correo
            })
          });
          setDatosReporte1(array_temporal)
        }
        setparamsReporte1({
          dato0: 'nit', 
          dato1: 'nombre', 
          dato2: 'celular', 
          dato3: 'correo'})
      })

  }
  
  return (
    <IonPage>
      <MenuSuperior/>
      <br />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonLabel className="titulo">
            <h1>
              Reporte 1
            </h1>
          </IonLabel>
        </IonToolbar>
      </IonHeader>
      <hr />

      <IonCard >
        <ion-scroll scrollX="true">
          <br />
          <IonLabel className="texto">
            <h2>
              Obtener el listado de clientes que han utilizado los servicios 
              de transporte al menos en una ocasión en los departamentos de 
              El Progreso y Zacapa, pero que no han transportado productos 
              refrigerados. Los datos que debe visualizar Nit, Nombre y 
              datos de contacto
            </h2>
          </IonLabel>

            {
              DatosReporte1.length > 0 ?
                <Table data={DatosReporte1} params={paramsReporte1} type={'rep1'} />
              : ""
            }


        </ion-scroll>
      </IonCard>
    </IonPage>
  );
};

export default Rep1;
