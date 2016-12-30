import firebase from 'firebase';
import {
  FETCH_LIBRARY_SUCCESS,
} from './types';

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
