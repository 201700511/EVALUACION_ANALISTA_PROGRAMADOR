import { IonIcon } from '@ionic/react';
import React, { useRef, useState, useEffect } from "react";
import Cookies from 'universal-cookie'
import {chatbubbles } from 'ionicons/icons';


var jwt = require('jsonwebtoken');
const cookies = new Cookies()

const MenuSuperior: React.FC = () => {

    return (
        <ion-toolbar slot="secondary">
            <ion-buttons  slot="start">
                <ion-button onClick={e => { window.location.href = "/dashboard" }}> 
                    Inicio 
                </ion-button>
                <ion-button onClick={e => { window.location.href = "/dashboard/Contactenos" }}> 
                    Contáctenos 
                </ion-button>
            </ion-buttons>
            
            <ion-buttons slot="end">
                <ion-button onClick={e => { window.location.href = "/dashboard/Contactenos" }}>
                    <p>
                        <IonIcon slot="icon-only" icon={chatbubbles} />
                    </p>
                </ion-button>
                <ion-button onClick={e => { window.location.href = "/"}}> 
                    Salir 
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
  
    )
}
export default MenuSuperior;
