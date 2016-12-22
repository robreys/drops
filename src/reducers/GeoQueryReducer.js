import {
  SET_GEOQUERY,
  LOCATION_UPDATE,
} from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_GEOQUERY:
      return action.payload;
    case LOCATION_UPDATE: {
      const { latitude, longitude } = action.payload;

      state.updateCriteria({
        center: [latitude, longitude]
      });

      return state;
    }
    default:
      return state;
  }
};
