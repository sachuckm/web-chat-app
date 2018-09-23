import React from 'react';
import style from './ContactInfoCard.css';


function ContactInfoCard (props) {
  const selected = props.isSelected ? 'selected' : '';
  return (
    
    <div onClick={( event ) => props.contactSelected( event,  props)} className = {`${selected} ${props.cssClassName}`}>
    <img className = "img" src= {props.img}/>
    <span className = "nameField">{props.name}</span>
    <hr className = "line"/>
    </div>
  );
}
  export default ContactInfoCard;