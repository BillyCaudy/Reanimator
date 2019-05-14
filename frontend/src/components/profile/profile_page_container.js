import { connect } from 'react-redux';
import { getUserCollections } from '../../actions/collection_actions';
import ProfilePage from './profile_page'

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserCollections: id => dispatch(getUserCollections(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);