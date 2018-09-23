import React, { Component } from 'react';
import './ChatComponent.css';
import ContactInfoCard from './../../components/ContactInfoCard/ContactInfoCard';
import ReactDOM from 'react-dom';
import ChatInputField from './../../components/ChatInputField/ChatInputField';
import ChatAreaComponent from './../../components/ChatAreaComponent/ChatAreaComponent';
import padStart from 'lodash/padStart';

let isOpen = true;
export default class ChatComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {inputvalue: ''};
      this.websocket = new WebSocket('ws://demos.kaazing.com/echo');
      this.onKeyPressEnter = this.onKeyPressEnter.bind(this);
      this.changecapture = this.changecapture.bind(this);
      this.websocket.onopen = (evt) => { this.onOpen(evt) };
      this.websocket.onmessage = (evt) => { this.onMessage(evt) };
      this.websocket.onmessage = (evt) => { this.onMessage(evt) };
      this.websocket.onerror = (evt) => { this.onError(evt) };
    } 

  onOpen(evt)
    {
      this.doSend(evt);
    }
  
     onClose(evt)
    {
      this.writeToScreen("DISCONNECTED");
    }
  
     onMessage(evt)
    {
      let message = {
        msg: evt.data,
        type: 'received'
      };
      if (!isOpen) {
        this.writeToScreen(message);
      }
    }

     onError(evt)
    {
      console.log('onError'+evt.data);
    }
  
     doSend(message)
    {
      let msg = {
        msg: message,
        type: 'sent'
      };
      if (!isOpen) {
      this.writeToScreen(msg);
      }
      this.websocket.send(message);
    }
  
     writeToScreen(msg)
    {

      let time = new Date();
      msg.time = (padStart(time.getHours(), 2, 0) + ":" + padStart(time.getMinutes(), 2, 0));
     if (this.props && this.props.messgeSave) {
      this.props.messgeSave(msg, this.props.selectedContact.id )
     }
    }
    handleSubmit(event) {
      this.setState({isLoggedIn: true});
    }

  componentWillUnmount() {
    this.websocket.close();
  }
  changecapture(event) {
    this.setState({inputvalue: event.target.value})
  }
onKeyPressEnter(e) {
  isOpen =false;
  if (e.charCode === 13) {
    this.websocket.onopen (e.target.value)
  this.setState({inputvalue: ''})
  }
}
  contactSelected(event) {
    event.preventDefault();
  }
  render() {

  const contactInfoCard =  <ContactInfoCard
  contactSelected = {this.contactSelected.bind(this)}
  img = {this.props.selectedContact && this.props.selectedContact.img ? this.props.selectedContact.img : ''}
  name = {this.props.selectedContact && this.props.selectedContact.name ? this.props.selectedContact.name : 'Sachin'}
  cssClassName ="container_chat"

  ></ContactInfoCard>
  /*const chatContainer = <ChatInputField
  changecapture = {this.changecapture}
  onKeyPressEnter = {this.onKeyPressEnter}
  inputvalue = {this.state.inputvalue}
  />*/
  const chatContainer =  <input placeholder="Type here and press enter" value = {this.state.inputvalue} onKeyPress={this.onKeyPressEnter} onChange={this.changecapture} className="inputText" type="text"/>
   const chatArea = <ChatAreaComponent
   messages = {this.props.selectedmessage}
   />
      return (
        <div className = "chatArea"> {contactInfoCard} {chatArea} {chatContainer}</div>
      );
    }
  }
  ReactDOM.render(
    <ChatComponent />,
    document.getElementById('root')
  );