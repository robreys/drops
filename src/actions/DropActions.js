import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import sample_drops from './sample_drops';
import {
  FETCH_NEARBY_SUCCESS,
  FETCH_LIBRARY_SUCCESS,
  DROP_SET_REF,
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

export const fetchNearby = () => {
  return {
    type: FETCH_NEARBY_SUCCESS,
    payload: sample_drops
  };
};

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

  return {
    type: DROP_SET_REF,
    payload: fbref
  };
};

export const dropEdit = ({ uid }) => {
  const { currentUser } = firebase.auth();
  const fbref = firebase.database().ref(`/users/${currentUser.uid}/drops/${uid}`);

  return {
    type: DROP_SET_REF,
    payload: fbref
  };
};

export const dropSave = ({ fbref, title, description, background, content }) => {
  return (dispatch) => {
    fbref
      .set({ title, description, background, content })
      .then(() => {
        dispatch({ type: DROP_SAVE_SUCCESS });
        Actions.libraryDropList({ type: 'reset' });
      });
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
