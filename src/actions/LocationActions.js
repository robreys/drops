import firebase from 'firebase';
import {
  UPDATE_WATCHID,
  UPDATE_LOCATION,
  NEARBY_ADD,
  NEARBY_REMOVE,
  CLEAR_LOCATION_REDUCER
} from './types';
import { geoKeyToFbKey } from '../utils';

const GeoFire = require('geofire');

const onKeyEntered = (dispatch, key, dropLocation, distance) => {
  const fbKey = geoKeyToFbKey(key);

  firebase.database().ref(fbKey)
    .on('value', snapshot => {
      const drop = { ...snapshot.val(), distance: distance.toFixed(2) };
      dispatch({ 
        type: NEARBY_ADD, 
        payload: { key, drop }
      });
    });
};

const onKeyExited = (dispatch, key) => {
  const fbKey = geoKeyToFbKey(key);

  firebase.database().ref(fbKey).off('value');

  dispatch({
    type: NEARBY_REMOVE,
    payload: key
  });
};

const initializeGeoQuery = (dispatch, position) => {
  const { latitude, longitude } = position.coords;
  
  const rootFbRef = firebase.database().ref('/locations');
  const geoFire = new GeoFire(rootFbRef);
  const geoQuery = geoFire.query({
      center: [latitude, longitude],
      radius: 0.3
    });

  geoQuery.on('key_entered', onKeyEntered.bind(null, dispatch));
  geoQuery.on('key_exited', onKeyExited.bind(null, dispatch));

  return geoQuery;
};

const onNewPosition = (dispatch, position, geoQuery) => {
  console.log(position);

  dispatch({
      type: UPDATE_LOCATION,
      payload: position.coords
    });

  if (geoQuery) {
    const { latitude, longitude } = position.coords;

    geoQuery.updateCriteria({ center: [latitude, longitude] });
  }
};

const onInitialPosition = (dispatch, position) => {
  onNewPosition(dispatch, position);
  const geoQuery = initializeGeoQuery(dispatch, position);

  // continue to watch location changes
  const watchID = navigator.geolocation.watchPosition(
      newPosition => onNewPosition(dispatch, newPosition, geoQuery),
      error => console.log(error),
      GEOLOCATION_OPTIONS
    );

  dispatch({
    type: UPDATE_WATCHID,
    payload: watchID
  });
};

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000
};

// make sure this doesn't get called multiple times in a row without clearing reducer
export const initializeLocation = () => {
  return (dispatch) => {
    // retrieve initial position
    navigator.geolocation.getCurrentPosition(
        onInitialPosition.bind(null, dispatch),
        error => console.log(error),
        GEOLOCATION_OPTIONS
      );
  };
};

export const clearLocationReducer = () => {
  return {
    type: CLEAR_LOCATION_REDUCER,
    payload: null
  };
};
