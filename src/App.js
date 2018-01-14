import React, { Component } from 'react';
import logo from './bulle.svg';
import './App.css';
import Chat from './Chat.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <div className="container" >
          <Chat/>
        </div>

      </div>
    );
  }
}

export default App;
