import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import NearbyDropReducer from './NearbyDropReducer';
import LibraryDropReducer from './LibraryDropReducer';
import LocationReducer from './LocationReducer';

export default combineReducers({
  nearbyDrops: NearbyDropReducer,
  libraryDrops: LibraryDropReducer,
  location: LocationReducer,
  form: formReducer
});
