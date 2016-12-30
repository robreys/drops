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

const tabIcon = ({ selected, title }) => {
  const { tabStyle, selectedTabStyle } = styles;

  if (selected) {
    return (
      <View styleName="flexible stretch vertical h-center v-center" style={selectedTabStyle}>
        <Subtitle styleName="bright">{title}</Subtitle>
      </View>
    );
  }

  return (
      <View styleName="flexible stretch vertical h-center v-center" style={tabStyle}>
        <Subtitle styleName="bright">{title}</Subtitle>
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
      sceneWithTabBarStyle
    } = styles;

    return (
      <Router navigationBarStyle={navBarStyle} titleStyle={titleStyle} getTitle={getTitle} navBar={NavBar}>
        <Scene key='auth'>
          <Scene key='login' title='Log In' component={LogInForm} />
          <Scene key='signUp' title='Sign Up' component={SignUpForm} />
        </Scene>

        <Scene key='home'>
          {/* tab container */}
          <Scene
            key='tabbar'
            tabs
          >

            {/* locate tab */}
            <Scene key='locate' title='LOCATE' icon={tabIcon}>
              <Scene key='nearbyDropList' title='Nearby' component={NearbyDropList} style={sceneWithTabBarStyle} />
              <Scene key='dropDetail' title='Detail' component={DropDetail} style={sceneStyle} hideTabBar />
              <Scene key='dropContent' title='Content' component={DropContent} style={sceneStyle} />
            </Scene>

            {/* manage tab */}
            <Scene key='manage' title='MANAGE' icon={tabIcon}>
              <Scene key='libraryDropList' title='Library' rightTitle="NEW" onRight={() => Actions.dropCreate()} component={LibraryDropList} style={sceneWithTabBarStyle} />
              <Scene key='dropEdit' title='Edit' rightTitle="SAVE" onRight={this.onSaveDrop} component={DropEdit} style={sceneStyle} hideTabBar />
              <Scene key='dropCreate' title='Create' rightTitle="SAVE" onRight={this.onCreateDrop} component={DropCreate} style={sceneStyle} hideTabBar />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default connect()(AppRouter);

const styles = {
  navBarStyle: {
    backgroundColor: '#212121'
  },
  titleStyle: {
    color: '#fff'
  },
  tabStyle: {
    backgroundColor: '#9E9E9E'
  },
  selectedTabStyle: {
    backgroundColor: '#212121'
  },
  sceneStyle: {
    paddingTop: 50
  },
  sceneWithTabBarStyle: {
    paddingTop: 50,
    marginBottom: 50
  }
};
