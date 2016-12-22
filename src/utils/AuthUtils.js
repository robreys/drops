import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { SubmissionError } from 'redux-form';

const loginUserSuccess = () => {
  Actions.home();
};

const signUpUserSuccess = (user, username) => {
  user.updateProfile({ displayName: username })
    .then(loginUserSuccess)
    .catch(authFail);
};

const authFail = (error) => {
  throw new SubmissionError({ _error: error.message });
};

export const signUpUser = ({ username, email, password }) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => signUpUserSuccess(user, username))
    .catch(authFail);
};

export const loginUser = ({ email, password }) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(loginUserSuccess)
    .catch(authFail);
};
