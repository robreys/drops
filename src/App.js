import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import reducers from './reducers';
import AppRouter from './AppRouter';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAHMuhhsXAGFVifJE2BXVVfO5lHVL1qemY',
      authDomain: 'drops-20927.firebaseapp.com',
      databaseURL: 'https://drops-20927.firebaseio.com',
      storageBucket: 'drops-20927.appspot.com',
      messagingSenderId: '246433728479'
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store} >
        <AppRouter />
      </Provider>
    );
  }
}

export default App;
