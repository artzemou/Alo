import React from 'react';
import ReactDOM from 'react-dom';
import io from "socket.io-client";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const socket = io();

//socket test
socket.on('hello', ({message})=>
	console.log(message)

);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
