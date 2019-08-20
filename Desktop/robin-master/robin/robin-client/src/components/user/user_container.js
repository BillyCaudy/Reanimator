import { connect } from "react-redux";
import { fetchUserChirps } from "../../actions/chirp_actions";
import User from "./user";

const mapStateToProps = state => {
  return {
    chirps: Object.values(state.chirps.user),
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserChirps: id => dispatch(fetchUserChirps(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
