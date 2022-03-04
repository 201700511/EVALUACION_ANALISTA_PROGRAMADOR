import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLabel,
        IonItem, IonSelect, IonSelectOption, IonCard, IonCardContent, IonRow, IonCol, IonButton
        } from '@ionic/react';
import React, { useRef, useState, useEffect } from "react";
import ControllerDashboard from '../../../../controller/sessions'
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie'
import './Home.css';

var jwt = require('jsonwebtoken');
const cookies = new Cookies()

const home: React.FC = () => {

  let Links = []
  
  async function fetchLinks() {
      var token = cookies.get('token')

      ControllerDashboard.REP1({
      }).then((data) => {
        console.log(data)
        data = data.map(element => {
          const array_temp = String(element.Curso).replace('[', '').split(']')
          Links.push({
            Cod: array_temp[0],
            Curso: array_temp[1].trim(),
            Link: element.Link
          })
        });
      })
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonLabel className="titulo">
            <h1>
              Dashboard
            </h1>
          </IonLabel>
        </IonToolbar>
      </IonHeader>
      <hr />

      <IonCard >
        <ion-scroll scrollX="true">
          <br />
          <IonLabel className="titulo">
            <h1>
              Reporte 1
            </h1>
          </IonLabel>
          <IonItem >
            <div className="table-container">
              <table id="table">
                <thead>
                  <tr>
                    <th>nit</th>
                    <th>Nombre </th>
                    <th>celular</th>
                    <th>correo</th>
                  </tr>
                </thead>
                <tbody>
                  {Links.map((x) => {
                    return <tr>
                      <td> 
                        {x.Cod}
                      </td>
                      <td> 
                        {x.Curso}
                      </td>
                      <td>
                        <a href={x.Link} target="_blank">
                          <button className="Button_link">
                            Ir a enlace
                          </button> 
                        </a>
                      </td>
                    </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
            <div></div>

          </IonItem>
        </ion-scroll>
      </IonCard>
    </IonPage>
  );
};

export default home;
