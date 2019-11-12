import React from 'react';
import logo from './logo.svg';
import './App.css';
import logo1 from './H.jpeg'
import Doctor from './Doctor';
import Appointment from './Appointment';
import Patient from './Patient';
import Home from './Home.js'


import {Route,Switch,Link,Redirect} from 'react-router-dom'



class App extends React.Component{
  render(){
      return(
          <div>                 
              <div className="header">            
                <p>
                   <ul>
                                       
                      <Link exact to="/Patient"><button id="btn_id">Patients</button></Link>                  
                      <Link exact to="/Doctor"><button id="btn_id">Doctors</button></Link>
                      <Link  exact to="/Appointment"><button id="btn_id">Appointment</button></Link>
                      <Link exact to="/home"><button id="btn_id">Home</button></Link> 
                      
                    </ul>
                </p>
                      <Switch>  
                            
                      <Route exact path="/Patient"  component={Patient} />
                      <Route exact path="/Appointment"  component={Appointment} />  
                      <Route  path="/Doctor" component={ Doctor }></Route>  
                      <Route exact path="/Home"  component={ Home } /> 
                      <Redirect to="/" />      
                                                    
                      </Switch>
               </div>   
                                   
          </div>
      );
    
  }
}
export  default App
