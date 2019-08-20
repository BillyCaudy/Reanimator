import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUserChirps } from "../../actions/chirp_actions";
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chirps: ""
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.props
      .fetchUserChirps("this.props.currentUser")
      .then(chirps => this.setState({ chirps: chirps }));
  }

  render() {
    console.log(this.state);
    return <div>This is the User's Profile.</div>;
  }
}

const mapStateToProps = state => {
  return {
    // chirps: Object.values(state.chirps.user),
    currentUser: state.session.user.id
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
