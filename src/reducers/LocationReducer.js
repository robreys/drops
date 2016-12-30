import {
  SET_GEOQUERY,
  UPDATE_GEOQUERY,
  UPDATE_LOCATION,
  UPDATE_WATCHID,
  CLEAR_LOCATION_REDUCER
} from '../actions/types';

const INITIAL_STATE = {
  geoQuery: null,
  watchID: null,
  position: {
    latitude: 37.3861,
    longitude: 122.0839
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_GEOQUERY:
      return { ...state, geoQuery: action.payload };
    case UPDATE_GEOQUERY: {
      const { latitude, longitude } = state.position;

      state.geoQuery.updateCriteria({
        center: [latitude, longitude]
      });

      return state;
    }
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
