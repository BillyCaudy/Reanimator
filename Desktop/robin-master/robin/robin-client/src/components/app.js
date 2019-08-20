import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import MainPage from "./main/main_page";
import NavBarContainer from "./nav/navbar_container";
// import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import ChirpIndex from "./chirps/chirp_index";
import UserFormContainer from "./user/user_container";
import "../stylesheets/splash.scss";
import "../stylesheets/index.scss";
const App = () => (
  <div className="app-container">
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/chirps" component={ChirpIndex} />
      <ProtectedRoute exact path="user/profile" component={UserFormContainer} />
    </Switch>
  </div>
);

export default App;
