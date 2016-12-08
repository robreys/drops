import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyDPvP0CQ9_rLpkO3X1yb6aZrGNq7FtqWB0',
      authDomain: 'manager-a4f74.firebaseapp.com',
      databaseURL: 'https://manager-a4f74.firebaseio.com',
      storageBucket: 'manager-a4f74.appspot.com',
      messagingSenderId: '1022320768726'
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store} >
        <Router />
      </Provider>
    );
  }
}

export default App;
