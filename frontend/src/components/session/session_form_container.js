import {connect} from 'react-dom';
import {signup} from '../../actions/session_actions';
import SignUpForm from './signup_form';

const mapStateToProps = (state) => {
    return{
        signedIn: state.session.isSignedIn,
        errors: state.errors.session
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signup: user => dispatch((user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);