import {
  NEARBY_ADD,
  NEARBY_REMOVE,
} from '../actions/types';

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
    default:
      return state;
  }
};
