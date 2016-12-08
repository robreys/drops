import React, { Component } from 'react';
import { View, TextInput, Button, Text } from '@shoutem/ui';

export default class extends Component {
  render() {
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
              <Text>SIGN UP</Text>
            </Button>
          </View>
      </View>
    );
  }
}
