import React from "react";
import { connect } from "react-redux";
import { fetchChirps } from "../../actions/chirp_actions";
import ChirpIndexItem from "./chirp_index_item";
import User from "../user/user";
class ChirpIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chirps: []
    };
  }

  componentDidMount() {
    this.props.fetchChirps().then(() => {
      this.setState({ chirps: this.props.chirps });
    });
  }
  render() {
    return (
      <div className="index-container">
        <div className="options">New Chirp 
        Your 
        Chirps</div>
        <div feed-container>
          {this.state.chirps.map((chirp, index) => (
            <ChirpIndexItem key={index} chirp={chirp} />
          ))}
        </div>
        <div>
          <img src={require("./idx-r.png")} className="index-pic2" alt="" />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    chirps: Object.values(state.chirps)
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
