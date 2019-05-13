import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/rout_util';
import { Switch, Link } from 'react-router-dom';
import HomePage from './HomePage';
import NavBarContainer from './nav/navbar_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

const App = () => (
    <div>
        <NavBarContainer/>
        <Switch>
            {/* <AuthRoute exact path = "/" component = {HomePage}/> */}
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            {/* <ProtectedRoute exact path="/collections" component={CollectionsContainer} /> */}
        </Switch>
    </div>
)

export default App;