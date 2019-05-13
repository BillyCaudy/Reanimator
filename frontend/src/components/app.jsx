import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/rout_util';
import { Switch } from 'react-router-dom';
import HomePage from './HomePage';

const App = () => (
    <div>
        <Switch>
            <AuthRoute exact path = "/" component = {HomePage}/>
        </Switch>
    </div>
)

export default App;