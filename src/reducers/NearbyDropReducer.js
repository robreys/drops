import _ from 'lodash';
import {
  NEARBY_ADD,
  NEARBY_REMOVE,
  UPDATE_LOCATION
} from '../actions/types';

const GeoFire = require('geofire');

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEARBY_ADD: {
      const { key, drop } = action.payload;
      return { ...state, [key]: drop };
    }
    case NEARBY_REMOVE: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    case UPDATE_LOCATION: {
      // recompute distances
      const position = [action.payload.latitude, action.payload.longitude];

      return _.mapValues(state, (drop) => {
        const location = [drop.location.latitude, drop.location.longitude];
        const distance = GeoFire.distance(location, position).toFixed(2);

        return { ...drop, distance };
      });
    }
    default:
      return state;
  }
};
