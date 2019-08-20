import React from "react";
// import { Link } from "react-router-dom";
// import {  } from "react-router-dom";
import LoginFormContainer from "../session/login_form_container";

class MainPage extends React.Component {
  render() {
    return (
      <div className="main">
        <img src={require("./left-bird.png")} className="left" alt="" />
        <LoginFormContainer />
        <img src={require("./treetwo.png")} className="left" alt="" />
      </div>
    );
  }
}

export default MainPage;
