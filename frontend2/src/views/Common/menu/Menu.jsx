import React, { useState } from 'react';
import {
  IonCard,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonNote,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonTabButton,
  IoIosArrowDropleft
} from '@ionic/react';

import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  speedometer,
  speedometerOutline,
  speedometerSharp,
  sendOutline,
  sendSharp,
  readerOutline,
  readerSharp,
  createOutline,
  createSharp
} from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import './Menu.css'

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Asignaciones',
    url: '/dashboard/Asignaciones',
    iosIcon: speedometerOutline,
    mdIcon: speedometerSharp,
    id: 1,
    subPages: [
      { title: '5to Curso o curso 40', url: '/dashboard/1', iosIcon: sendOutline, mdIcon: sendSharp },
      { title: 'Constancia de cursos', url: '',  iosIcon: sendOutline,mdIcon: sendSharp },
      { title: 'Cursos en semestre', url: '',  iosIcon: sendOutline,mdIcon: sendSharp },
      { title: 'Practicas PROPEC', url: '',  iosIcon: sendOutline,mdIcon: sendSharp }
    ]
  },
  {
    title: 'Consulta de notas',
    url: '/dashboard/Notas',
    iosIcon: readerOutline,
    mdIcon: readerSharp,
    id: 2,
    subPages: [
      { title: 'Asignaciones por curso', url: '/dashboard/Outbox2',  iosIcon: sendOutline,mdIcon: sendSharp },
      { title: 'Consulta Zonas', url: '',  iosIcon: sendOutline,mdIcon: sendSharp },
      { title: 'Historial por escuela', url: '',  iosIcon: sendOutline,mdIcon: sendSharp },
      { title: 'Inconsistencias por cursos', url: '',  iosIcon: sendOutline,mdIcon: sendSharp },
      { title: 'Notas semestre actual', url: '',  iosIcon: sendOutline,mdIcon: sendSharp }
    ]
  },
  {
    title: 'Formularios',
    url: '/dashboard/Formularios',
    iosIcon: createOutline,
    mdIcon: createSharp,
    id: 3,
    subPages: [
      { title: 'Fomularios varios', url: '', iosIcon: sendOutline,mdIcon: sendSharp }
    ]
  },
  {
    title: 'Datos Personales',
    url: '/dashboard/Datos_Personales',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
    id: 4,
    subPages: [
      { title: 'Información personal', url: '', iosIcon: sendOutline,mdIcon: sendSharp },
      { title: 'Estado Inscripción', url: '', iosIcon: sendOutline,mdIcon: sendSharp }
    ]
  }
];

function verificaClicks(n){
  if(n === 1)
    return 0
  else
    return 1
}

const Menu = () => {
  const location = useLocation();

  const [gender, setGender] = useState();
  
  const [values, setValues] = useState()

  const handleInputChange = (e) => {
    // const {name, value } = e.target
    alert(1)
    console.log(e)
    // setValues({...values, [name]: value})
  }

  return (

    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Soy Económicas</IonListHeader>
          <IonNote>
            "Nombre de estudiante"
          </IonNote>


          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>

                
                {/* <ion-item>
                  <ion-label>Gender</ion-label>
                  <ion-select placeholder="Select One">
                    <ion-select-option value="f">Female</ion-select-option>
                    <ion-select-option value="m">Male</ion-select-option>
                  </ion-select>
                </ion-item> */}

                


                <IonItem
                  className={ 
                  location.pathname === appPage.url 
                    ? 'selected'
                    : 'none'}   
                    click={ //"OpcionMenu =" + appPage.id
                        //verificaClicks(appPage.id)
                      location.pathname === appPage.url 
                      ? 'OpcionMenu' + appPage.id + ' = 1'
                      : 'OpcionMenu' + appPage.id + ' = 0'
                    }   
                    // onClick={alert(1)}
                    // onSubmit={alert(1)}
                    routerLink={appPage.url}
                    // onChange={'OpcionMenu' + appPage.id + ' === 0'
                    //   ? 'OpcionMenu' + appPage.id + ' = 1'
                    //   : 'OpcionMenu' + appPage.id + ' = 0'}
                    // IonChange={e => setGender(e.detail.value)}
                    selected = { !'OpcionMenu' + appPage.id  }
                    routerDirection="none" lines="none" detail={false}>
                      {/* <button ion-button="" icon-end="" onChange={handleInputChange}>
                        Send
                        <ion-icon name="send" size="large" color="primary"></ion-icon>
                      </button> */}
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>

                <ion-item-group>
                    {appPage.subPages.map((appPage2, index) => {
                      return (
                          <IonItem  className={ //"OpcionMenu =" + appPage.id
                                                //  location.pathname === appPage.url  
                                                //   ?   'SubOpcionMenu' + appPage.id
                                                //   : 
                                                  'subnone' //'SubOpcionMenu' + appPage.id + ' = 0'
                                              }
                              routerLink={appPage2.url} routerDirection="none" lines="none" detail={false}>
                            <IonIcon slot="start" ios={appPage2.iosIcon} md={appPage2.mdIcon} />
                            <IonLabel>{appPage2.title} 
                            </IonLabel>
                          </IonItem>
                      );
                    })}
                </ion-item-group>

              </IonMenuToggle>
            );
          })}
        </IonList>

      </IonContent>
    </IonMenu>

  );
}

export default Menu;