import React from "react";
import { Link, withRouter } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="nav-auth">
          <Link to={"/chirps"}>All chirps</Link>
          <Link to={"/user/profile"}>Profile</Link>
          {/* <Link to={"/new_chirp"}>Write a Chirp</Link> */}
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="home-links">
          <span className="sign-up">
            <Link to={"/signup"}>Signup</Link>
          </span>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="navBar-container">
        <Link className="logo" to={"/"}>
          Robin
        </Link>
        <span className="slogan">Chirp it Up.</span>
        {this.getLinks()}
      </div>
    );
  }
}

export default withRouter(NavBar);
