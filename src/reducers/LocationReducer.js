import {
  UPDATE_LOCATION,
  UPDATE_WATCHID,
  CLEAR_LOCATION_REDUCER
} from '../actions/types';

const INITIAL_STATE = {
  watchID: null,
  position: {
    latitude: 37.3861,
    longitude: 122.0839
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LOCATION: 
      return { ...state, position: action.payload };
    case UPDATE_WATCHID:
      return { ...state, watchID: action.payload };
    case CLEAR_LOCATION_REDUCER: {
      navigator.geolocation.clearWatch(state.watchID);
      return { ...state, watchID: null };
    }
    default:
      return state;
  }
};
