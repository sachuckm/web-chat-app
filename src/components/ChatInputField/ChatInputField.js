import React from 'react';
import './ChatInputField.css';


function ChatInputField (props) {
 
   
  return (
    <div className= "">
     <input placeholder="Type here" value = {props.innerValue} onKeyPress={props.onKeyPressEnter} onChange={props.changecapture} className="inputText" type="text"/>
    </div>
  );
}
  export default ChatInputField;