import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from '@shoutem/ui';
import { reduxForm, change } from 'redux-form';
import DropForm from './shared/DropForm';
import { createDropRef, saveDrop } from '../utils';

const FORM_NAME = 'dropCreate';

const submit = (values) => {
  console.log('values', values);
  saveDrop(values);
};

class DropCreate extends Component { 
  componentWillMount() {
    const { dispatch, location } = this.props;
    
    dispatch(change(FORM_NAME, 'fbref', createDropRef()));
    dispatch(change(FORM_NAME, 'location', location));
  } 

  render() {
    return (
      <View styleName="flexible">
        <DropForm />
      </View>
    );
  }
}

// Decorate the form component
const FormComponent = reduxForm({
  form: FORM_NAME, // a unique name for this form
  onSubmit: submit
})(DropCreate);

const mapStateToProps = state => {
  const { position } = state.location;
  return { location: position };
};

export default connect(mapStateToProps)(FormComponent);
