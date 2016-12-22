import firebase from 'firebase';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import {
  FETCH_LIBRARY_SUCCESS,

  DROP_RESET,
  DROP_UPDATE,
  DROP_EDIT_CONTENT,
  DROP_ADD_CONTENT,
  DROP_DELETE_CONTENT,
  DROP_SAVE_SUCCESS,

  CONTENT_FORM_ADD,
  CONTENT_FORM_EDIT,
  CONTENT_FORM_CLOSE,
  CONTENT_UPDATE
} from './types';

const GeoFire = require('geofire');

export const fetchLibrary = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/drops`)
      .on('value', snapshot => {
        dispatch({ 
          type: FETCH_LIBRARY_SUCCESS, 
          payload: snapshot.val()
        });
      });
  };
};

export const dropCreate = () => {
  const { currentUser } = firebase.auth();
  const fbref = firebase.database().ref(`/users/${currentUser.uid}/drops`).push();

  return (dispatch) => {
    dispatch({
      type: DROP_RESET,
      payload: null
    });

    navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch({
            type: DROP_UPDATE,
            payload: { prop: 'location', value: { latitude, longitude } }
          });
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );

    dispatch({
      type: DROP_UPDATE,
      payload: { prop: 'fbref', value: fbref }
    });
  };
};

export const dropEdit = ({ uid }) => {
  const { currentUser } = firebase.auth();
  const fbref = firebase.database().ref(`/users/${currentUser.uid}/drops/${uid}`);

  return {
    type: DROP_UPDATE,
    payload: { prop: 'fbref', value: fbref }
  };
};

export const dropDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/drops/${uid}`)
      .remove()
      .then(() => {
        Actions.libraryDropList({ type: 'reset' });
      });
  };
};

export const dropSave = ({ fbref, location, title, description, background, content }) => {
  return (dispatch) => {
    // update firebase
    const { currentUser } = firebase.auth();
    const owner = currentUser.displayName;
    const lastUpdated = moment().format();

    fbref
      .set({ title, description, background, content, owner, lastUpdated })
      .then(() => {
        dispatch({ type: DROP_SAVE_SUCCESS });
        Actions.libraryDropList({ type: 'reset' });
      });

    // update geofire
    const locationsRef = firebase.database().ref('/locations');
    const geoFire = new GeoFire(locationsRef);
    const key = encodeURIComponent(/.+firebaseio\.com(.+)/g.exec(fbref.toString())[1]);
    console.log(key);
    geoFire.get(key).then(
        (value) => {
          if (value == null) {
            geoFire.set(key, [location.latitude, location.longitude]);
          }
        },
        (error) => console.log(error)
      );
  };
};

export const dropUpdate = ({ prop, value }) => {
  return {
    type: DROP_UPDATE,
    payload: { prop, value }
  };
};

export const dropEditContent = ({ uid, value }) => {
  return {
    type: DROP_EDIT_CONTENT,
    payload: { uid, value }
  };
};

export const dropAddContent = ({ value }) => {
  return {
    type: DROP_ADD_CONTENT,
    payload: value
  };
};

export const dropDeleteContent = ({ uid }) => {
  return {
    type: DROP_DELETE_CONTENT,
    payload: uid
  };
};

export const editContent = ({ item }) => {
  return {
    type: CONTENT_FORM_EDIT,
    payload: item
  };
};

export const addContent = () => {
  return {
    type: CONTENT_FORM_ADD,
    payload: null
  };
};

export const contentUpdate = ({ prop, value }) => {
  return {
    type: CONTENT_UPDATE,
    payload: { prop, value }
  };
};

export const closeContentForm = () => {
  return {
    type: CONTENT_FORM_CLOSE,
    payload: null
  };
};
