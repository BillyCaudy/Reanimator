import { RECEIVE_COLLECTIONS, RECEIVE_USER_COLLECTIONS, RECEIVE_NEW_COLLECTION } from '../actions/collection_actions';

const CollectionsReducer = (state = { all_collections: {}, user_collections: {}, new_collection: undefined }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_COLLECTIONS:
            newState.all_collections = action.collections.data;
            return newState;
        case RECEIVE_USER_COLLECTIONS:
            newState.user_collections = action.collections.data;
            return newState;
        case RECEIVE_NEW_COLLECTION:
            newState.new_collection = action.collection.data
            return newState;
        default:
            return state;
    }
};
export default CollectionsReducer;
