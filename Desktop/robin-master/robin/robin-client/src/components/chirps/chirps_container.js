import { connect } from "react-redux";
import { fetchChirps } from "../../actions/chirp_actions";
import ChirpIndex from "./chirp_index";

const mapStateToProps = state => {
  return {
    chirps: Object.values(state.chirps.all)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChirps: () => dispatch(fetchChirps())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChirpIndex);
