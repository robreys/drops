import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { View, Button, Text } from '@shoutem/ui';
import { reduxForm, initialize } from 'redux-form';
import DropForm from './shared/DropForm';
import { createDropRef, saveDrop, deleteDrop } from '../utils';

const FORM_NAME = 'dropEdit';

const submit = (values) => {
    console.log('values', values);
    saveDrop(values);
};

class DropEdit extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    const {
      uid,
      location,
      title,
      background,
      description,
      content
    } = this.props.drop;

    console.log('uid', uid);

    dispatch(initialize(FORM_NAME, {
      fbref: createDropRef(uid),
      location,
      title,
      background,
      description,
      content
    }));
  }

  onDelete() {
    const { title, uid } = this.props.drop;

    Alert.alert(
      `Deleting ${title}`,
      'Are you sure you want to delete this drop?',
      [
        {
          text: 'DELETE',
          onPress: () => deleteDrop({ uid })
        }, {
          text: 'CANCEL',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ]
    );
  }

  render() {
    const { deleteButtonStyle, deleteTextStyle } = styles;

    return (
      <View styleName="flexible">
        <DropForm />
        <Button
          style={deleteButtonStyle}
          onPress={this.onDelete.bind(this)}
        >
          <Text style={deleteTextStyle}>DELETE DROP</Text>
        </Button>
      </View>
    );
  }
}

const styles = {
  deleteButtonStyle: {
    backgroundColor: '#F44336'
  },
  deleteTextStyle: {
    color: 'white'
  }
};

// Decorate the form component
const FormComponent = reduxForm({
  form: FORM_NAME, // a unique name for this form
  onSubmit: submit
})(DropEdit);

export default connect()(FormComponent);
