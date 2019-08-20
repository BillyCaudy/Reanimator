import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import chirps from "./chirp_reducer";
const RootReducer = combineReducers({
  session,
  errors,
  chirps
});

export default RootReducer;
