import React, { Component } from 'react';
import { View, Button, Text, Spinner, Caption } from '@shoutem/ui';
import { Field, reduxForm } from 'redux-form';
import { Keyboard } from 'react-native';
import { TextField } from '../common';
import { signUpUser } from '../../utils';

class SignUpForm extends Component {
  onSubmit(values) {
    Keyboard.dismiss();
    return signUpUser(values);
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
        <Text>SIGN UP</Text>
      </Button>
    );
  }

  render() {
    const { error } = this.props;
    const { errorMessageStyle } = styles;

    return (
      <View styleName="flexible vertical v-center">
        <Field
          name='username'
          component={TextField}
          placeholder='username'
        />
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

        <View styleName="horizontal h-center md-gutter">
          <Caption styleName="bold" style={errorMessageStyle}>{error}</Caption>
        </View>
      </View>
    );
  }
}
const styles = {
  errorMessageStyle: {
    color: '#E53935'
  }
};

// Decorate the form component
export default reduxForm({
  form: 'signup', // a unique name for this form
})(SignUpForm);
