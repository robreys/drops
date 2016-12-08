import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, TextInput, Button, Text } from '@shoutem/ui';

export default class extends Component {
  render() {
    const { signUpStyle } = styles;

    return (
      <View styleName="flexible vertical v-center">
          <TextInput 
            placeholder={'email'}
          />
          <TextInput 
            placeholder={'password'}
            secureTextEntry
          />
          <View styleName="horizontal">
            <Button
              styleName="confirmation dark"
              onPress={() => console.log('yo')}
            >
              <Text>LOG IN</Text>
            </Button>
          </View>
          <View styleName="horizontal h-center">
            <Button
              styleName="tight clear"
              onPress={() => console.log('yo')}
            >
              <Text styleName="bold">Forgot your password?</Text>
            </Button>
          </View>
          <View styleName="horizontal h-center" style={signUpStyle}>
            <Button
              styleName="tight clear"
              onPress={() => Actions.signUp()}
            >
              <Text styleName="bold">Sign up for Drops.</Text>
            </Button>
          </View>
      </View>
    );
  }
}

const styles = {
  signUpStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  }
};
