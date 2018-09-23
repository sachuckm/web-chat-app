import React, { Component } from 'react';
import './ContactsComponent.css';
//import Inventory from './../inventory/Inventory';
import ContactInfoCard from './../../components/ContactInfoCard/ContactInfoCard';
import ReactDOM from 'react-dom';
//import logo from './../../images/logo.png';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';

import img1 from './../../../src/resource/images/download_1.jpg';
import img2 from './../../../src/resource/images/download_2.png';

import img3 from './../../../src/resource/images/download_3.png';

import img4 from './../../../src/resource/images/download_4.png';

import img5 from './../../../src/resource/images/download_5.png';

import img6 from './../../../src/resource/images/download_6.png';
export default class ContactsComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {name:'Sachin', Seachid : '', searchedNames : [], names: [
        {isSelected:true, img:require('./../../resource/images/download_6.png'), id:1, name : 'Sachin'},
        {isSelected:false,img:img2,  id:2, name : 'Prithvi'},
        {isSelected:false,img:img3,  id:3, name : 'Pranith'},
        {isSelected:false,img:img4,  id:4, name : 'Raghu'},
        {isSelected:false,img:img5,  id:5, name : 'Rama'},
        {isSelected:false,img:img6,  id:6, name : 'Vani'},
        {isSelected:false,img:img1,  id:7, name : 'Joseph'},
        {isSelected:false,img:img2,  id:8, name : 'John'},
        {isSelected:false,img:img3,  id:9, name : 'Arjun'},
        {isSelected:false,img:img4,  id:10, name : 'Sharan'},
        {isSelected:false,img:img5,  id:11, name : 'Manju'},
        {isSelected:false,img:img6,  id:12, name : 'Akbhar'},
        {isSelected:false,img:img2,  id:13, name : 'Pooja'},
        {isSelected:false,img:img4,  id:14, name : 'Madhu'},
        {isSelected:false,img:img4,  id:15, name : 'Sid'}
      ]};

    }
 
    changecapture = (event) => {
      console.log(JSON.stringify(this.state.names))
      let searchArray = this.state.names.filter((item) => {
        if (this.props.selectedContact.id === item.id && item.isSelected === this.props.selectedContact.isSelected) {
          item.isSelected = true
        } else {  item.isSelected = false; }
        
            if (includes(toLower(item.name), toLower(event.target.value))) 
            return item
      })
      console.log('search'+searchArray);
      this.setState({Seachid : event.target.value})
      if (searchArray.length !== this.state.searchedNames.length)
      this.setState({searchedNames : searchArray})

      

    }
    contactSelected (event, selectedItem) {
console.log('selectedItem'+this.props);

  const updatedItems = this.state.searchedNames.map((item) => {
   item.id === selectedItem.id ? item.isSelected = true : item.isSelected = false;
   return item;
})

this.setState({searchedNames: updatedItems})
this.props.selectContactAction(selectedItem);
    }
    componentDidMount() {
      this.setState({searchedNames: this.state.names})
      console.log(this.context.redux);
    }
    render() {
  const contactInfoCard =  <ContactInfoCard
  name = {this.state && this.state.names &&this.state.names[0].name}
  img = {this.state && this.state.names &&this.state.names[0].img}
  cssClassName ="containercontact"
  ></ContactInfoCard>
  const list = this.state.searchedNames.map((item, index) =>
        <ContactInfoCard 
            contactSelected = {this.contactSelected.bind(this)}
            img = {item.img}
            name = {item.name}
            isSelected ={item.isSelected}
            cssClassName ="containercontactrelative"
             id={item.id}
            >
        </ContactInfoCard>);
  const contactsContainer = (
    <div>
        {contactInfoCard}
        <input placeholder="Search Contacts"  onChange={this.changecapture} value={this.state.Seachid} className="SearchContacts" type="text" />
        {list}
    </div>
) 
      return (
        <div className = "contactsList">
       {contactsContainer}
        </div>
      );
    }
  }
  ReactDOM.render(
    <ContactsComponent />,
    document.getElementById('root')
  );