import {
  FETCH_LIBRARY_SUCCESS
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LIBRARY_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
