import firebase from 'firebase';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

const GeoFire = require('geofire');

const UNLOCK_RANGE = 0.006; // 0.006 km ~ 20 ft

const fbKeyToGeoKey = (key) => {
  return encodeURIComponent(/.+firebaseio\.com(.+)/g.exec(key)[1]);
};

export const geoKeyToFbKey = (key) => {
  return decodeURIComponent(key);
};

export const isInUnlockRange = (distance) => {
  return !Number.isNaN(distance) && distance <= UNLOCK_RANGE;
};

export const createDropRef = (uid) => {
  const { currentUser } = firebase.auth();
  
  if (uid) {
    return firebase.database().ref(`/users/${currentUser.uid}/drops/${uid}`);
  }

  return firebase.database().ref(`/users/${currentUser.uid}/drops`).push();
};

export const saveDrop = ({ fbref, location, title, description, background, content }) => {
  // update firebase
  const { currentUser } = firebase.auth();
  const owner = currentUser.displayName;
  const lastUpdated = moment().format();

  fbref
    .set({ title, description, background, content, owner, lastUpdated, location })
    .then(() => Actions.libraryDropList({ type: 'reset' }));

  // update geofire
  const fbLocRef = firebase.database().ref('/locations');
  const geoRef = new GeoFire(fbLocRef);
  const geoKey = fbKeyToGeoKey(fbref.toString());

  geoRef.get(geoKey).then(
      (value) => {
        if (value == null) {
          geoRef.set(geoKey, [location.latitude, location.longitude]);
        }
      },
      (error) => console.log(error)
    );
};

export const deleteDrop = ({ uid }) => {
  const { currentUser } = firebase.auth();

  // update firebase
  const fbref = firebase.database().ref(`/users/${currentUser.uid}/drops/${uid}`);
  fbref
    .remove()
    .then(() => {
      Actions.libraryDropList({ type: 'reset' });
    });

  // update geofire
  const fbLocRef = firebase.database().ref('/locations');
  const geoRef = new GeoFire(fbLocRef);
  const geoKey = fbKeyToGeoKey(fbref.toString());

  geoRef.remove(geoKey);
};
