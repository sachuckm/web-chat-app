import ContactsComponent from "./ContactsComponent";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectContactAction} from './../../actions/userAction';


const mapStateToProps = (state) => {
  return {
        selectedContact: state.userReducer.selectedContact,
        selectedmessage: state.userReducer.selectedmessage
  };

};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectContactAction
  }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsComponent);
