import ChatComponent from "./ChatComponent";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectContactAction, messgeSave} from './../../actions/userAction';


const mapStateToProps = (state) => {
  return {
        selectedContact: state.userReducer.selectedContact,
        selectedmessage:state.userReducer.selectedmessage
  };

};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectContactAction,
    messgeSave
  }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);
