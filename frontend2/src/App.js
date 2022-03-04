import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Login from './views/auth/Login/Login'
import ResetPassword from './views/auth/ResetPass/ResetPassword'
import Dashboard from './views/dashboard/Dashboard'

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
    <Router>
      <Switch>

        <Route path='/' exact component={Login} />
        <Route path='/ResetPassword' exact component={ResetPassword} />
        <Route path="/dashboard" render={(props) => sessionStorage.getItem("Account") !== null
            ? <Dashboard {...props} />
            // <Route path='/ResetPassword' exact component={ResetPassword} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
        />
        <Route path="/page" render={(props) => sessionStorage.getItem("Account") !== null
            ? <Dashboard {...props} />
            // <Route path='/ResetPassword' exact component={ResetPassword} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
        />

      </Switch>
    </Router>
    </div>
  );
}

export default App;
