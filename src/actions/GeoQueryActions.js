import firebase from 'firebase';
import {
  SET_GEOQUERY,
  LOCATION_UPDATE,

  NEARBY_ADD,
  NEARBY_REMOVE,

  NOOP
} from './types';

const GeoFire = require('geofire');

const getPositionSuccess = (position, dispatch) => {
  const { latitude, longitude } = position.coords;
  const rootFbRef = firebase.database().ref('/locations');
  const geoFire = new GeoFire(rootFbRef);
  const geoQuery = geoFire.query({
    center: [latitude, longitude],
    radius: 0.3
  });

  geoQuery.on(
      'key_entered', 
      (key, dropLocation, distance) => {
        firebase.database().ref(decodeURIComponent(key))
          .once('value', snapshot => {
            const drop = { ...snapshot.val(), dropLocation, distance };
            dispatch({ 
              type: NEARBY_ADD, 
              payload: { key, drop }
            });
          });
      }
    );

  geoQuery.on(
      'key_exited', 
      (key) => {
        dispatch({
          type: NEARBY_REMOVE,
          payload: key
        });
      }
    );

  dispatch({
    type: SET_GEOQUERY,
    payload: geoQuery
  });
};

export const initGeoQuery = ({ geoQuery }) => {
  if (!geoQuery) {
    return (dispatch) => {
      navigator.geolocation.getCurrentPosition(
          (position) => getPositionSuccess(position, dispatch),
          (error) => console.log(error),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        ); 
    };
  }
  // nothing to do
  return {
    type: NOOP,
    payload: null
  };
};

// export const updateGeoQuery = () => {
//   return {
//     type: UPDATE_GEOQUERY,
//     payload: null
//   };
// };

export const updateLocation = ({ location }) => {
  return {
    type: LOCATION_UPDATE,
    payload: location
  };
};
