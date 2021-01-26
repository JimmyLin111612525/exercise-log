import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import React,{useContext} from "react"

import {UserContext} from "./providers/UserProvider"
import Login from './login/Login'
import Register from './login/Register'
import ExerciseLogPage from './exercise-log/ExerciseLogPage'

//import Login_Register from './login/Login_Register'

function Application() {
  const user = useContext(UserContext);
  return (
    user?
      <div className="App">
        Exercise Log
        <ExerciseLogPage/>
      </div>
      
    :
      <BrowserRouter>
        <div className="App">
          Exercise Log
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/register" component={Register}/>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default Application;