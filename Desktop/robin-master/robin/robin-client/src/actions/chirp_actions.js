import { getChirps, getUserChirps, writeChirp } from "../util/chirp_api_util";

export const RECEIVE_CHIRPS = "RECEIVE_CHIRPS";
export const RECEIVE_USER_CHIRPS = "RECEIVE_USER_CHIRPS";
export const RECEIVE_NEW_CHIRP = "RECEIVE_NEW_CHIRP";

export const receiveChirps = chirps => ({
  type: RECEIVE_CHIRPS,
  chirps
});

export const receiveUserChirps = chirps => ({
  type: RECEIVE_USER_CHIRPS,
  chirps
});

export const receiveNewChirp = chirp => ({
  type: RECEIVE_NEW_CHIRP,
  chirp
});

export const fetchChirps = () => dispatch =>
  getChirps()
    .then(chirps => dispatch(receiveChirps(chirps)))
    .catch(err => console.log(err));

export const fetchUserChirps = id => dispatch =>
  getUserChirps(id)
    .then(chirps => dispatch(receiveUserChirps(chirps)))
    .catch(err => console.log(err));

export const composeChirp = data => dispatch =>
  writeChirp(data)
    .then(chirp => dispatch(receiveNewChirp(chirp)))
    .catch(err => console.log(err));
