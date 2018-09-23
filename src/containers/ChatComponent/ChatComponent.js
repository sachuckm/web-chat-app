import React, { Component } from 'react';
import './ChatComponent.css';
import ContactInfoCard from './../../components/ContactInfoCard/ContactInfoCard';
import ReactDOM from 'react-dom';
import ChatInputField from './../../components/ChatInputField/ChatInputField';
import ChatAreaComponent from './../../components/ChatAreaComponent/ChatAreaComponent';
import padStart from 'lodash/padStart';




import { messgeSave } from '../../actions/userAction';
const wsUri = "wss://echo.this.websocket.org/";
const output = '';
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
      //init();
    } 

  
    init() {
      //output = document.getElementById("output");
      this.testWebSocket();
    }
  
     testWebSocket() {
     //this.websocket = new WebSocket(wsUri);
      //this.websocket.onopen = (evt) => { this.onOpen(evt) };
      //this.websocket.onclose = (evt) => { this.onClose(evt) };
      //this.websocket.onmessage = (evt) => { this.onMessage(evt) };
      //this.websocket.onerror = (evt) => { this.onError(evt) };
    }
  
    onOpen(evt)
    {
      console.log('open'+evt);
//this.writeToScreen("CONNECTED");
      this.doSend(evt);
    }
  
     onClose(evt)
    {
     // this.writeToScreen("DISCONNECTED");
    }
  
     onMessage(evt)
    {
      let message = {
        msg: evt.data,
        type: 'received'
      };
      if (!isOpen) {
        this.writeToScreen(message);
        //this.websocket.close();
        console.log('message'+evt.data);
      }
      
     
      
    }
  
     onError(evt)
    {
      console.log('onError'+evt.data);

      //this.writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }
  
     doSend(message)
    {
      //this.writeToScreen("SENT: " + message);
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
      let messages = [];
      var time = new Date();
    //alert(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
      msg.time = (padStart(time.getHours(), 2, 0) + ":" + padStart(time.getMinutes(), 2, 0));
      //messages.push(this.props && this.props.message);
      let message = {
        msg: msg,
        type: 'received'
      };
     // messages.push(message)
     if (this.props && this.props.messgeSave) {
      this.props.messgeSave(msg, this.props.selectedContact.id )
     }
     console.log('########selectedContact#########'+JSON.stringify(this.props.selectedContact));
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@'+message);
      //output.appendChild(pre);
    }
    handleSubmit(event) {
      this.setState({isLoggedIn: true});
    }
componentWillMount() {
    this.init();
}
componentWillReceiveProps() {
  console.log('###############'+this.props);
}
componentWillUpdate() {
  console.log('########componentWillUpdate#######'+this.props);
}
changecapture(event) {
  this.setState({inputvalue: event.target.value})
}
onKeyPressEnter(e) {
  console.log('#############skjdkj###'+e.target.value);
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