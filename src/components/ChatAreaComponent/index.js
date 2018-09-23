import ChatAreaComponent from "./ChatAreaComponent";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
        selectedContact: state.userReducer.selectedContact,
        selectedmessage:state.userReducer.selectedmessage
  };

};

export default connect(mapStateToProps)(ChatAreaComponent);
