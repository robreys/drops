import {
  AUTH_FIELD_CHANGE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_FIELD_CHANGE:
      // action.payload === { prop: 'name', value: 'jane' }
      return { ...state, [action.payload.prop]: action.payload.value };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, loading: false };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'AUTHENTICATION FAILED', password: '', loading: false };
    default:
      return state;
  }
};
