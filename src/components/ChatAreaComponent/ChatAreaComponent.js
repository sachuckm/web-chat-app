import React from 'react';
import './ChatAreaComponent.css';


function ChatAreaComponent (props) {
    const messages  =  props.messages && props.messages.map((message, index) =>
    <div className = "textStyle"><p className = {message.type === 'sent' ? 'chatmsgReceived':'chatmsg'}>{message.msg}<span class="time">{message.time}</span> <br /></p></div>
    
)
  return (
    <div className= "chatAreaCmp">
    {messages}
    <br/>
    </div>
  );
}
  export default ChatAreaComponent;