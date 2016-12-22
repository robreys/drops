import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import NearbyDropReducer from './NearbyDropReducer';
import LibraryDropReducer from './LibraryDropReducer';
import DropFormReducer from './DropFormReducer';
import GeoQueryReducer from './GeoQueryReducer';

export default combineReducers({
  nearbyDrops: NearbyDropReducer,
  libraryDrops: LibraryDropReducer,
  dropForm: DropFormReducer,
  geoQuery: GeoQueryReducer,
  form: formReducer
});
