import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Subtitle, View } from '@shoutem/ui';
import LogInForm from './components/auth/LogInForm';
import SignUpForm from './components/auth/SignUpForm';
import NearbyDropList from './components/NearbyDropList';
import LibraryDropList from './components/LibraryDropList';
import DropDetail from './components/DropDetail';
import DropContent from './components/DropContent';
import DropEdit from './components/DropEdit';
import DropCreate from './components/DropCreate';

const TabIcon = ({ selected, title }) => {

  if (selected) {
    return (
      <View styleName="flexible stretch vertical h-center v-center" style={{ backgroundColor: '#212121' }}>
        <Subtitle styleName="bright">{title}</Subtitle>
      </View>
    );
  }

  return (
      <View styleName="flexible stretch vertical h-center v-center" style={{ backgroundColor: '#BDBDBD' }}>
        <Subtitle styleName="bright">{title}</Subtitle>
      </View>
  );
};

const RouterComponent = () => {
  return (
    <Router navigationBarStyle={{ backgroundColor: '#212121' }} titleStyle={{ color: '#fff' }}>
      <Scene key='auth'>
        <Scene key='login' title='Log In' component={LogInForm} />
        <Scene key='signUp' title='Sign Up' component={SignUpForm} style={{ paddingTop: 50 }} />
      </Scene>

      <Scene key='home' initial>
        {/* tab container */}
        <Scene
          key='tabbar'
          tabs
        >

          {/* locate tab */}
          <Scene key='locate' title='LOCATE' icon={TabIcon} >
            <Scene key='nearbyDropList' title='Nearby' component={NearbyDropList} style={{ paddingTop: 50, marginBottom: 50 }} />
            <Scene key='dropDetail' title='Detail' component={DropDetail} style={{ paddingTop: 50 }} hideTabBar />
            <Scene key='dropContent' title='Content' component={DropContent} style={{ paddingTop: 50 }} />
          </Scene>

          {/* manage tab */}
          <Scene key='manage' title='MANAGE' icon={TabIcon} initial>
            <Scene key='libraryDropList' title='Library' rightTitle="NEW" onRight={() => Actions.dropCreate()} component={LibraryDropList} style={{ paddingTop: 50, marginBottom: 50 }} />
            <Scene key='dropEdit' title='Edit' rightTitle="SAVE" onRight={() => {}} component={DropEdit} style={{ paddingTop: 50 }} hideTabBar />
            <Scene key='dropCreate' title='Create' rightTitle="SAVE" onRight={() => {}} component={DropCreate} style={{ paddingTop: 50 }} hideTabBar />
          </Scene>
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
