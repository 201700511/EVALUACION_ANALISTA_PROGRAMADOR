import React, { useEffect, useState } from "react";
import logo from "../../../assets/img/logo.jpg";
import { NavLink, Link } from "react-router-dom";

import './SideMenu.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

import ControllerDashboard from '../../../controller/sessions'

import caret_right_fill from '../../../assets/icons/caret-right-fill.svg'
import pencil_square from '../../../assets/icons/pencil-square.svg'
import person_circle from '../../../assets/icons/person-circle.svg'
import speedometer2 from '../../../assets/icons/speedometer2.svg'
import table from '../../../assets/icons/table.svg'
import Cookies from 'universal-cookie'

var jwt = require('jsonwebtoken');
const cookies = new Cookies()

export let accesos = []

library.add(faCheckSquare, faCoffee)
/**
 * @author
 * @function SideMenu
 **/

// added more menuItems for testing
export const menuItems = [
  {
    name: 'Reportes',
    to: '#',
    iosIcon: speedometer2,
    iconClassName: speedometer2,
    exact: true,
    id: 1,
    subMenus: [
      { name: 'Reporte 1', to: '/dashboard/Reporte1',  iosIcon: caret_right_fill,iconClassName: caret_right_fill },
      { name: 'Reporte 2', to: '/dashboard/Reporte2', iosIcon: caret_right_fill, iconClassName: caret_right_fill }
    ]
  },
  {
    name: 'Datos Personales',
    to: '/dashboard',
    iconClassName: person_circle,
    exact: true,
    id: 4
  }
];

const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);
  const [Name, setName] = useState("");
  const [ID, setID] = useState("");

  useEffect(() => {
    var token = cookies.get('token')
    
    ControllerDashboard.GetName({
      header: token
    }).then((data) => {
      setName(data.Nombre)
      setID(data.nit)
    })

    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  //just an improvment and it is not recorded in video :(
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  /*just a little improvement over click function of menuItem
    Now no need to use expand state variable in MenuItem component
  */
  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);


  // var decoded = jwt.verify(cookies.get('token'), process.env.SECRET_JWT);
  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>

    <div className="side-menu-top">
      <a href="/dashboard">
        <div className="avatar">
          <img src={logo} alt="user" />
        </div>
      </a>
      <div className="user-info">
        <h3>El Camioncito</h3>
        <h5>
          <small>
            {Name}
          </small>
        </h5>
        <h5>
          <small>
            {ID}
          </small>
        </h5>
      </div>
    </div>

    <br/>

      <div className="top-section">
        {/* <div className="logo">
          <img src={logo} alt="webscript" width="500" />
        </div> */}


        {/* <div className="logo">
          <img src={logo} alt="webscript" width="50" />
        </div>

        <div className="logo">
          <h3>
          &nbsp; Soy Económicas
          </h3>
        </div> */}

        <hr/>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <i></i>
            // <svg xmlns="http://www.w3.org/2000/svg" width="30" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16" color="black">
            //   <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
            // </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="30"  fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg>
          )}
        </div>
      </div>

      <div className="divider"></div>

      <div className="main-menu">
        <ul>
          {menuItems.map((menuItem, index) => (
          //   <MenuItem
          //   key={index}
          //   name={menuItem.name}
          //   exact={menuItem.exact}
          //   to={menuItem.to}
          //   subMenus={menuItem.subMenus || []}
          //   iconClassName= {menuItem.iconClassName}
          //   onClick={(e) => {
          //     if (inactive) {
          //       setInactive(false);
          //     }
          //   }}
          // />
            <li onClick={props.onClick}>
            <Link
              exact
              to={menuItem.to}
              // onClick={() => {
              //   setExpand((e) => !e);
              // }}
              className={`menu-item`} onClick={(e) => {
                    if (inactive) {
                      setInactive(false);
                    }
                  }}
            >
              
              <div className="menu-icon">
                <img src={menuItem.iconClassName}  />
              </div>
              <span>{menuItem.name}</span>
            </Link>
            {menuItem.subMenus && menuItem.subMenus.length > 0 ? (
              <ul className={`sub-menu`}>
                {menuItem.subMenus.map((menu, index) => (
                  <li key={index} className="li_submenu">
                    
                    <NavLink to={menu.to} onClick={(e) => {
                        if (!inactive) {
                          setInactive(true);
                        }
                      }}>
                    <img src={menu.iconClassName}  />
                      {menu.name}</NavLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
          ))}

          {/* <li>
            <a className="menu-item">
              <div className="menu-icon">
                <i class="bi bi-speedometer2"></i>
              </div>
              <span>Dashboard</span>
            </a>
          </li>
          <MenuItem
            name={"Content"}
            subMenus={[{ name: "Courses" }, { name: "Videos" }]}
          />
          <li>
            <a className="menu-item">
              <div className="menu-icon">
                <i class="bi bi-vector-pen"></i>
              </div>
              <span>Design</span>
            </a>
          </li> */}
        </ul>
      </div>
{/* 
      <div className="side-menu-footer">
        <div className="avatar">
          <img src={user} alt="user" />
        </div>
        <div className="user-info">
          <h5>Rizwan Khan</h5>
          <p>rizwankhan@gmail.com</p>
        </div>
      </div> */}
    </div>
  );
};

export default SideMenu;
