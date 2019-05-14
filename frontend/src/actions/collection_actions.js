import { fetchCollections, fetchUserCollections, createCollection } from '../util/collections_api_util'

export const RECEIVE_COLLECTIONS = "RECEIVE_COLLECTIONS";
export const RECEIVE_USER_COLLECTIONS = "RECEIVE_USER_COLLECTIONS";
export const RECEIVE_NEW_COLLECTION = "RECEIVE_NEW_COLLECTION"


export const receiveCollections = collections => ({
    type: RECEIVE_COLLECTIONS, 
    collections
}); 

export const receiveUserCollections = collections => ({
    type: RECEIVE_USER_COLLECTIONS, 
    collections
}); 

export const receiveNewCollection = collection => ({
    type: RECEIVE_NEW_COLLECTION, 
    collection
}); 


export const getCollections = () => dispatch => (
    fetchCollections()
        .then(collections => dispatch(receiveCollections(collections)))
        .catch(err => console.log(err))
);

export const getUserCollections = () => dispatch => (
    fetchUserCollections()
        .then(collections => dispatch(receiveUserCollections(collections)))
        .catch(err => console.log(err))
);

export const makeNewCollection = () => dispatch => (
    createCollection()
        .then(collection => dispatch(receiveNewCollection(collection)))
        .catch(err => console.log(err))
);