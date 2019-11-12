import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import logo1 from './H.jpeg'
import "./App.css";
class Home extends React.Component {
    render() {
      return(<div>
        <br/><br/>
        <br/>
        <img src={logo1} alt="my image"  className="home"/>
      
        </div>) 
      }
    }
  
  export default Home;

// ReactDOM.render(<App />,document.getElementById('root'))
