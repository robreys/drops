import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import NearbyDropReducer from './NearbyDropReducer';
import LibraryDropReducer from './LibraryDropReducer';
import DropFormReducer from './DropFormReducer';

export default combineReducers({
  auth: AuthReducer,
  nearbyDrops: NearbyDropReducer,
  libraryDrops: LibraryDropReducer,
  dropForm: DropFormReducer
});
