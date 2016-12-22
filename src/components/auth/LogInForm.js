import React, { Component } from 'react';
import { View, Button, Text, Spinner, Caption } from '@shoutem/ui';
import { Actions } from 'react-native-router-flux';
import { Field, reduxForm } from 'redux-form';
import { Keyboard } from 'react-native';
import { TextField } from '../common';
import { loginUser } from '../../utils';

class LoginForm extends Component {
  onSubmit(values) {
    Keyboard.dismiss();
    return loginUser(values);
  }

  renderSubmitButton() {
    const { submitting, handleSubmit } = this.props;
    if (submitting) {
      return (<Spinner size="large" />);
    }

    return (
      <Button
        styleName="confirmation dark"
        onPress={handleSubmit(this.onSubmit.bind(this))}
      >
        <Text>LOG IN</Text>
      </Button>
    );
  }

  render() {
    const { error } = this.props;
    const { signUpButtonStyle, errorMessageStyle } = styles;

    return (
      <View styleName="flexible vertical v-center">
        <Field
          name='email'
          component={TextField}
          placeholder='email'
          keyboardType='email-address'
        />
        <Field
          secureTextEntry
          name='password'
          component={TextField}
          placeholder='password'
        />

        <View styleName="horizontal h-center">
          {this.renderSubmitButton()}
        </View>

        <View styleName="horizontal h-center">
          <Button
            styleName="tight clear"
            onPress={() => console.log('yo')}
          >
            <Text styleName="bold">Forgot your password?</Text>
          </Button>
        </View>

        <View styleName="horizontal h-center md-gutter">
          <Caption styleName="bold" style={errorMessageStyle}>{error}</Caption>
        </View>

        <View styleName="horizontal h-center" style={signUpButtonStyle}>
          <Button
            styleName="tight clear"
            onPress={Actions.signUp}
          >
            <Text styleName="bold">Sign up for Drops</Text>
          </Button>
        </View>
      </View>
    );
  }
}
const styles = {
  signUpButtonStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  errorMessageStyle: {
    color: '#E53935'
  }
};

// Decorate the form component
export default reduxForm({
  form: 'login', // a unique name for this form
})(LoginForm);
