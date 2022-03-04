import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/home/Home';
import { useState } from "react";


const Dashboard = () =>{

    const [inactive, setInactive] = useState(false);
    return(

        <div className="App">
      <Router>

        <div className={`container ${inactive ? "inactive" : ""}`}>
            <Route exact path={"/dashboard"}>
              <Home />
            </Route>

        </div>
      </Router>
    </div>

    )
}

export default Dashboard;