import React, { Component } from 'react';
import './ContactsComponent.css';
import ContactInfoCard from './../../components/ContactInfoCard/ContactInfoCard';
import ReactDOM from 'react-dom';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import findIndex from 'lodash/findIndex';

import img1 from './../../../src/resource/images/download_1.jpg';
import img2 from './../../../src/resource/images/download_2.png';

import img3 from './../../../src/resource/images/download_3.png';

import img4 from './../../../src/resource/images/download_4.png';

import img5 from './../../../src/resource/images/download_5.png';

import img6 from './../../../src/resource/images/download_6.png';
export default class ContactsComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { Seachid : '', searchedNames : [], names: [
        {isSelected:false, img:require('./../../resource/images/download_6.png'), id:1, name : 'Sachin'},
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
      let searchArray = this.state.names.filter((item) => {
        if (this.props.selectedContact.id === item.id && item.isSelected === this.props.selectedContact.isSelected) {
          item.isSelected = true
        } else {  item.isSelected = false; }
        
            if (includes(toLower(item.name), toLower(event.target.value))) 
            return item
      })
      this.setState({Seachid : event.target.value})
      if (searchArray.length !== this.state.searchedNames.length)
      this.setState({searchedNames : searchArray})

      

    }
    contactSelected (event, selectedItem) {
      const updatedItems = this.state.searchedNames.map((item) => {
      item.id === selectedItem.id ? item.isSelected = true : item.isSelected = false;
        return item;
      })
      const updatedItem = this.state.searchedNames.find((item) => {
        item.id === selectedItem.id ? item.isSelected = true : item.isSelected = false;
        if (item.id === selectedItem.id) return item;
        })
      this.setState({searchedNames: updatedItems})
      this.props.selectContactAction(updatedItem);
    }
    componentDidMount() {
      let localst = JSON.parse(localStorage.getItem('state'));
      let names = null;
      if (localst && localst.userReducer && localst.userReducer.selectedContact) {
        const index = findIndex(this.state.names, {id: localst.userReducer.selectedContact.id});
        this.state.names.splice(index, 1, localst.userReducer.selectedContact);
      } else {
        this.state.names.splice(0, 1, {isSelected:true, img:require('./../../resource/images/download_6.png'), id:1, name : 'Sachin'});
      }
     
      this.setState({searchedNames: this.state.names})
      // this.props.selectContactAction(this.props.selectedContact);
    }
    contactcard(event) {
      event.preventDefault();
    }
    render() {
      const contactInfoCard =  <ContactInfoCard
      contactSelected = {this.contactcard.bind(this)}
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
        const contactsContainer = (<div>
        {contactInfoCard}
        <input placeholder="Search Contacts"  onChange={this.changecapture} value={this.state.Seachid} className="SearchContacts" type="text" />
        {list}
        </div>) 
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