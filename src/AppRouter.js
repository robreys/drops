import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Subtitle, View } from '@shoutem/ui';
import { submit } from 'redux-form';
import LogInForm from './components/auth/LogInForm';
import SignUpForm from './components/auth/SignUpForm';
import NearbyDropList from './components/NearbyDropList';
import LibraryDropList from './components/LibraryDropList';
import DropDetail from './components/DropDetail';
import DropContent from './components/DropContent';
import DropEdit from './components/DropEdit';
import DropCreate from './components/DropCreate';
import NavBar from './components/common/NavBar';
import TabBar from './components/common/TabBar';
import Colors from './resources/Colors';

const styles = {
  navBarStyle: {
    backgroundColor: Colors.darkBlue
  },
  titleStyle: {
    color: 'white'
  },
  tabStyle: {
    backgroundColor: Colors.gray
  },
  selectedTabStyle: {
    backgroundColor: Colors.darkBlue
  },
  sceneStyle: {
    paddingTop: 50
  },
};

const tabIcon = ({ selected, title }) => {
  const { tabStyle, selectedTabStyle } = styles;

  if (selected) {
    return (
      <View styleName="flexible stretch vertical h-center v-center" style={selectedTabStyle}>
        <Subtitle styleName="bright bold">{title}</Subtitle>
      </View>
    );
  }

  return (
      <View styleName="flexible stretch vertical h-center v-center" style={tabStyle}>
        <Subtitle styleName="bright bold">{title}</Subtitle>
      </View>
  );
};

const getTitle = (state) => {
  const { sceneKey, title } = state;

  switch (sceneKey) {
    case 'dropDetail':
      return `${title} (${state.drop.title})`;
    case 'dropContent':
      return `${title} (${state.dropTitle})`;
    case 'dropEdit':
      return `${title} (${state.drop.title})`;
    default:
      return state.title;
  }
};

class AppRouter extends Component {
  onCreateDrop(state) {
    state.dispatch(submit('dropCreate'));
  }

  onSaveDrop(state) {
    state.dispatch(submit('dropEdit'));
  }

  render() {
    const { 
      navBarStyle,
      titleStyle,
      sceneStyle,
    } = styles;

    return (
      <Router navigationBarStyle={navBarStyle} titleStyle={titleStyle} getTitle={getTitle} navBar={NavBar}>
        <Scene key='auth'>
          <Scene key='login' title='Log In' component={LogInForm} />
          <Scene key='signUp' title='Sign Up' component={SignUpForm} />
        </Scene>

        <Scene key='home' initial>
          {/* tab container */}
          <Scene
            key='tabbar'
            tabs
            component={TabBar}
          >

            {/* nearby tab */}
            <Scene key='nearby' title='NEARBY' icon={tabIcon}>
              <Scene key='nearbyDropList' title='Nearby' component={NearbyDropList} style={sceneStyle} />
              <Scene key='dropDetail' title='Detail' component={DropDetail} style={sceneStyle} hideTabBar />
              <Scene key='dropContent' title='Content' component={DropContent} style={sceneStyle} />
            </Scene>

            {/* nearby tab */}
            <Scene key='library' title='LIBRARY' icon={tabIcon}>
              <Scene key='libraryDropList' title='Library' component={LibraryDropList} style={sceneStyle} />
              <Scene key='dropEdit' title='Edit' rightTitle="Save" onRight={this.onSaveDrop} component={DropEdit} style={sceneStyle} hideTabBar />
              <Scene key='dropCreate' title='Create' rightTitle="Save" onRight={this.onCreateDrop} component={DropCreate} style={sceneStyle} hideTabBar />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default connect()(AppRouter);
