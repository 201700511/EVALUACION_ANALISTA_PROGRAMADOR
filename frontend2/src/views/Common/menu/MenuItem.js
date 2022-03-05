import React, { useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";

/**
 * @author
 * @function MenuItem
 **/
import './SideMenu.css'

const MenuItem = (props) => {
  const { name, subMenus, iconClassName, onClick, to, exact } = props;
  const [expand, setExpand] = useState(false);

  return (
    <li onClick={props.onClick}>
      <Link
        exact
        to={to}
        // onClick={() => {
        //   setExpand((e) => !e);
        // }}
        className={`menu-item`}
      >
        
        <div className="menu-icon">
          <img src={iconClassName}  />
        </div>
        <span>{name}</span>
      </Link>
      {subMenus && subMenus.length > 0 ? (
        <ul className={`sub-menu`}>
          {subMenus.map((menu, index) => (
            <li key={index}>
              
              <NavLink to={menu.to}>
              <img src={menu.iconClassName}  />
                {menu.name}</NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default MenuItem;
