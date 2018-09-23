import set from 'lodash/set'
const defaultState = {
   id : [],
   selectedContact : {isSelected:true, img:require('./../../src/resource/images/download_6.png'), id:1, name : 'Sachin'}
  };

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
  
    case "ON_CONTACT_SELECTED":
    
      return {
        ...state,
        selectedContact: action.selectedContact,
        selectedmessage: state[action.selectedContact.id] && state[action.selectedContact.id].message || ''
      };
      case "ON_MESSAGE_CHANGED" :
      console.log('ssssssss'+state)
     // set(state, action.id, {id : action.id, message: action.message});
      const stateid = state[action.id] ? state[action.id] : set(state, action.id, {id : action.id, message:[]});;
      console.log('2222222'+stateid[action.id]);
      let msg =  action.id ? state[action.id].message : state[action.id].message
      console.log('2222222'+state[action.id].message );
     const newArray = msg.push(action.message);
      const newmsg = msg.map((item) => {
          return item;
      })
      return {
          ...state,
          selectedmessage:  newmsg
      }
  
    default:
      return state;
    }
  
  };
  
  export default userReducer;
  