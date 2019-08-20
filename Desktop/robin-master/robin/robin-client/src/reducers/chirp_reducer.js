import {
  RECEIVE_CHIRPS,
  RECEIVE_USER_CHIRPS,
  RECEIVE_NEW_CHIRP
} from "../actions/chirp_actions";

const ChirpsReducer = (
  state = { all: {}, user: {}, new: undefined },
  action
) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CHIRPS:
      newState.all = action.chirps.data;
      return newState.all;
    case RECEIVE_USER_CHIRPS:
      newState.user = action.chirps.data;
      return newState;
    case RECEIVE_NEW_CHIRP:
      newState.new = action.chirp.data;
      return newState;
    default:
      return state;
  }
};

export default ChirpsReducer;
