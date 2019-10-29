import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
//import '/socket.io/socket.io.js';

import Login from "./pages/Login";
import JoinRoom from "./pages/JoinRoom";

export const routes = [
  {
    path: '/login', 
    component: Login
  }, 
  {
    path: '/joinRoom', 
    component: JoinRoom
  }
]

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/joinRoom" component={JoinRoom} />
        <Route exact path="/" component={Login} />
      </Router>
    
    );
  }
}

export default App;

{/*
  {routes.map(({ path, component: C}) => (
    <Route
      exact path={path}
      render={(props) => <C {...props} />}
    />
  ))}
          
*/}

{/*
import React from 'react';
import logo from './logo.svg';
import './App.css';
import '/socket.io/socket.io.js';

ReactDOM.render(
  <Main/>, 
  document.getElementById("root")
);


function App() {
  return (
    <body>
      <form action="">
        <input id="u" autocomplete="off" /><button>Continue</button>
      </form>
    </body>
  );
}
export default App;

import React from 'react';
import ReactDOM from 'react-dom';
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }
  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }
  render() {
    return (
      <form>
      <h1>Hello {this.state.username}</h1>
      <p>Enter your name:</p>
      <input
        type='text'
        onChange={this.myChangeHandler}
      />
      </form>
    );
  }
}
ReactDOM.render(<MyForm />, document.getElementById('root'));
*/}