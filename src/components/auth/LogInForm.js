import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, TextInput, Button, Text, Spinner } from '@shoutem/ui';
import { authFieldChange, loginUser } from '../../actions';

class LoginForm extends Component {
  onEmailChange(value) {
    this.props.authFieldChange({ prop: 'email', value });
  }

  onPasswordChange(value) {
    this.props.authFieldChange({ prop: 'password', value });
  }

  onLogin() {
    console.log(this.props);
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderLoginButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }

    return (
      <Button
        styleName="confirmation dark"
        onPress={this.onLogin.bind(this)}
      >
        <Text>LOG IN</Text>
      </Button>
    );
  }

  render() {
    const { signUpStyle, errorStyle } = styles;

    return (
      <View styleName="flexible vertical v-center">
          <TextInput 
            placeholder={'email'}
            value={this.props.email}
            onChangeText={this.onEmailChange.bind(this)}
          />
          <TextInput 
            placeholder={'password'}
            secureTextEntry
            value={this.props.password}
            onChangeText={this.onPasswordChange.bind(this)}
          />
          <View styleName="horizontal h-center">
            {this.renderLoginButton()}
          </View>
          <View styleName="horizontal h-center">
            <Button
              styleName="tight clear"
              onPress={() => console.log('yo')}
            >
              <Text styleName="bold">Forgot your password?</Text>
            </Button>
          </View>
          <View styleName="horizontal h-center">
            <Text styleName="bold" style={errorStyle}>{this.props.error}</Text>
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
  },
  errorStyle: {
    color: '#F44336'
  }
};

const mapStateToProps = state => {
  const { email, password, loading, error } = state.auth;

  return { email, password, loading, error };
};

export default connect(mapStateToProps, { authFieldChange, loginUser })(LoginForm);

