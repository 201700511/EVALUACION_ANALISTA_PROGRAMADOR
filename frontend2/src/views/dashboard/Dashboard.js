import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Perfil from './pages/home/Perfil';
import Rep1 from './pages/Reportes/rep1/Rep1'
import Rep2 from './pages/Reportes/rep2/Rep2'
import { useState } from "react";
import SideMenu, { menuItems } from "../Common/menu/SideMenu";


const Dashboard = () =>{

    const [inactive, setInactive] = useState(false);
    return(

        <div className="App">
      <Router>
        <SideMenu
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
          />

        <div className={`container ${inactive ? "inactive" : ""}`}>
            <Route exact path={"/dashboard"}>
              <Perfil />
            </Route>
            <Route exact path={"/dashboard/Reporte1"}>
              <Rep1 />
            </Route>
            <Route exact path={"/dashboard/Reporte2"}>
              <Rep2 />
            </Route>

        </div>
      </Router>
    </div>

    )
}

export default Dashboard;