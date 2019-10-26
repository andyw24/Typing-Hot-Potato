import React from 'react';
import logo from './logo.svg';
import './App.css';
import '/socket.io/socket.io.js';

ReactDOM.render(
  <Main/>, 
  document.getElementById("root")
);

/*
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
*/