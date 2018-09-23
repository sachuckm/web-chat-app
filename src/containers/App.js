import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatComponent from './ChatComponent';
import ContactsComponent from './ContactsComponent';
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>hello</h1>
        <ChatComponent></ChatComponent>
        <ContactsComponent></ContactsComponent>
      </div>
    );
  }
}
export default App;
