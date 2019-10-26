import React from 'react';
import ReactDOM from 'react-dom';
import './frontend/index.css';
import Login from './frontend/pages/Login';
import JoinRoom from './frontend/pages/JoinRoom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import * as serviceWorker from './frontend/serviceWorker';

ReactDOM.render(
	<Login />, 
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
