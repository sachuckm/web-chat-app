
  export const selectContactAction = (selectedContact, selectedmsg) => {
    return {
      type: 'ON_CONTACT_SELECTED',
      selectedContact,
      selectedmsg
    };
  };
  export const messgeSave = (message, id,) => {
    return {
      type: 'ON_MESSAGE_CHANGED',
      message,
      id
    };
  };
  
  