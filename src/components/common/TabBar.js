import React, { Component, PropTypes } from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Tabs from 'react-native-tabs';
import { DefaultRenderer, Actions, TabbedView, Util } from 'react-native-router-flux';
import RNVIcon from 'react-native-vector-icons/Ionicons';
import Colors from '../../resources/Colors';

const styles = StyleSheet.create({
  circleButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: Colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [
      {
        scale: 1.5
      }
    ],
    alignSelf: 'center'
  },
  innerCircle: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class TabBar extends Component {

  static propTypes = {
    navigationState: PropTypes.object,
    tabIcon: PropTypes.any,
    onNavigate: PropTypes.func,
    unmountScenes: PropTypes.bool,
    pressOpacity: PropTypes.number,
    hideOnChildTabs: PropTypes.bool,
  };

  static onSelect(el) {
    if (!Actions[el.props.name]) {
      throw new Error(
        `No action is defined for name=${el.props.name} ` +
        `actions: ${JSON.stringify(Object.keys(Actions))}`);
    }
    if (typeof el.props.onPress === 'function') {
      el.props.onPress();
    } else {
      Actions[el.props.name]();
    }
  }

  constructor(props, context) {
    super(props, context);
    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(navigationState) {
    return (
      <DefaultRenderer
        key={navigationState.key}
        onNavigate={this.props.onNavigate}
        navigationState={navigationState}
      />
    );
  }

  render() {
    const state = this.props.navigationState;
    const selected = state.children[state.index];

    const hideTabBar = this.props.unmountScenes ||
      Util.deepestExplicitValueForKey(state, 'hideTabBar') ||
      (this.props.hideOnChildTabs && Util.deepestExplicitValueForKey(selected, 'tabs'));

    const contents = (
      <View>
      <Tabs
        style={state.tabBarStyle}
        selectedIconStyle={state.tabBarSelectedItemStyle}
        iconStyle={state.tabBarIconContainerStyle}
        onSelect={TabBar.onSelect} {...state}
        selected={selected.sceneKey}
        pressOpacity={this.props.pressOpacity}
      >
        {state.children.filter(el => el.icon || this.props.tabIcon).map((el) => {
          const Icon = el.icon || this.props.tabIcon;
          return <Icon {...this.props} {...el} />;
        })}
      </Tabs>
        <TouchableHighlight
          underlayColor="#BDBDBD"
          style={styles.circleButton}
          onPress={() => Actions.dropCreate()}
        >
          <View style={styles.innerCircle}>
            <RNVIcon name="md-add" size={30} color={'#fff'} />
          </View>
        </TouchableHighlight>
      </View>
    );
    return (
      <View
        style={{ flex: 1 }}
      >
        <TabbedView
          navigationState={this.props.navigationState}
          style={{ flex: 1 }}
          renderScene={this.renderScene}
        />
        {!hideTabBar && state.children.filter(el => el.icon).length > 0 &&
          (state.tabBarBackgroundImage ? (
            <Image source={state.tabBarBackgroundImage}>
              {contents}
            </Image>
          ) : contents)
        }
      </View>
    );
  }
}

export default TabBar;
