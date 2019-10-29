import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { withRouter } from 'react-router-dom';
 
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

  handleSubmit = (event) => {
    var socket = socketIOClient(this.state.endpoint);
    event.preventDefault();
    //alert("You are submitting " + this.state.username);
    event.preventDefault(); // prevents page reloading
    socket.emit('login', this.state.username);
    
    var thisPage = this;

    socket.on('redirect', function(destination) {
      console.log("Redirecting...");
      thisPage.props.history.push('/joinRoom');
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Hello {this.state.username}</h1>
        <p>What should we call you? OI BRUV</p>
        <input type='text' onChange={this.myChangeHandler}/>
        <input type='submit' value="Continue"/>
      </form>
    );
  }
}
 
export default withRouter(Login);