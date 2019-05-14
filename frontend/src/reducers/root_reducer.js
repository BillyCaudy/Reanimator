import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import collections from './collections_reducer';

const rootReducer = combineReducers({
    // entities,
    session,
    errors,
    collections,
    // ui
});

export default rootReducer;