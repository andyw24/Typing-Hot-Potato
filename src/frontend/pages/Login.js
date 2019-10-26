import React, { Component } from "react";
import socketIOClient from "socket.io-client";
 
class Login extends Component {

  constructor() {
    super();
    this.state = { 
      username: '', 
      endpoint: "http://localhost:5001/"
    };
  }


  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }

  mySubmitHandler = (event) => {
    var socket = socketIOClient(this.state.endpoint);
    event.preventDefault();
    alert("You are submitting " + this.state.username);
    event.preventDefault(); // prevents page reloading
    socket.emit('login', this.state.username);
    
    socket.on('redirect', function(destination) {
      console.log("Redirecting...");
    });
  }

  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
        <h1>Hello {this.state.username}</h1>
        <p>What should we call you?</p>
        <input type='text' onChange={this.myChangeHandler}/>
        <input type='submit' value="Continue"/>
      </form>
    );
  }
}
 
export default Login;