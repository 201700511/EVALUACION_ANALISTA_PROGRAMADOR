import {IonButtons,  IonHeader, IonMenuButton, IonPage,  IonToolbar, IonLabel,
        IonItem, IonCard
        } from '@ionic/react';
import React, { useRef, useState, useEffect } from "react";
import ControllerDashboard from '../../../../../controller/sessions'
import Swal from 'sweetalert2'
import Table from '../../../../Common/table/Table';
import MenuSuperior from '../../../../Common/menu superior/MenuSuperior';
import Cookies from 'universal-cookie'
import './Rep2.css';

var jwt = require('jsonwebtoken');
const cookies = new Cookies()

const Rep2: React.FC = () => {

  const[DatosReporte1, setDatosReporte1]= useState([]);
  const[paramsReporte1, setparamsReporte1]= useState([]);
  
  useEffect(() => {
    fetchReporte1()
  }, []);
  
  async function fetchReporte1() {
      let array_temporal = []
      var token = cookies.get('token')

      ControllerDashboard.GetName({
        header: token
      })

      ControllerDashboard.REP2({
        header: token
      }).then((data) => {
        console.log(data)
        if(data.length > 0){
          data.map(element => {
            array_temporal.push({
              dato0: element.Total,
              dato1: element.Promedio_Servicio,
              dato2: element.celular,
              dato3: element.correo
            })
          });
          setDatosReporte1(array_temporal)
        }
        setparamsReporte1({
          dato0: 'Total', 
          dato1: 'Promedio_Servicio', 
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
              Reporte 2
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
            Obtener el monto de gastos de los servicios prestados durante 
            el mes de enero de 2018, el promedio de los servicios facturados 
            durante el mes de enero 2018, posteriormente especifique el 
            monto de ganancia que obtuvo la empresa
            </h2>
          </IonLabel>

            {
              DatosReporte1.length > 0 ?
                <Table data={DatosReporte1} params={paramsReporte1} type={'rep2'} />
              : ""
            }


        </ion-scroll>
      </IonCard>
    </IonPage>
  );
};

export default Rep2;
