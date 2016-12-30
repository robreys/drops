import firebase from 'firebase';
import {
  SET_GEOQUERY,
  UPDATE_GEOQUERY,
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
    .once('value', snapshot => {
      const drop = { ...snapshot.val(), dropLocation, distance };
      dispatch({ 
        type: NEARBY_ADD, 
        payload: { key, drop }
      });
    });
};

const onKeyExited = (dispatch, key) => {
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

  dispatch({
    type: SET_GEOQUERY,
    payload: geoQuery
  });
};

const onNewPosition = (dispatch, position) => {
  console.log(position);
  dispatch({
    type: UPDATE_LOCATION,
    payload: position.coords
  });
};

const onInitialPosition = (dispatch, position) => {
  onNewPosition(dispatch, position);
  initializeGeoQuery(dispatch, position);
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

    // continue to watch location changes
    const watchID = navigator.geolocation.watchPosition(
        onNewPosition.bind(null, dispatch),
        error => console.log(error),
        GEOLOCATION_OPTIONS
      );

    dispatch({
      type: UPDATE_WATCHID,
      payload: watchID
    });
  };
};

export const updateGeoQuery = () => {
  return {
    type: UPDATE_GEOQUERY,
    payload: null
  };
};

export const clearLocationReducer = () => {
  return {
    type: CLEAR_LOCATION_REDUCER,
    payload: null
  };
};
