import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, Text } from '@shoutem/ui';
import { reduxForm, initialize } from 'redux-form';
import DropForm from './shared/DropForm';
import ModalContainer from './shared/ModalContainer';
import { createDropRef, saveDrop, deleteDrop } from '../utils';
import Colors from '../resources/Colors';

const FORM_NAME = 'dropEdit';

const styles = {
  deleteButton: {
    backgroundColor: Colors.red
  },
  cancelButton: {
    backgroundColor: Colors.gray
  }
};

const submit = (values) => {
    console.log('values', values);
    saveDrop(values);
};

class DropEdit extends Component {
  state = {
    modalForm: {
      visible: false
    }
  };

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

  renderModalButtons() {
    return (
        <View styleName="horizontal sm-gutter">
          <Button
            style={styles.deleteButton}
            styleName="full-width"
            onPress={() => deleteDrop(this.props.drop)}
          >
            <Text styleName="bright">Delete</Text>
          </Button>
          <Button
            style={styles.cancelButton}
            styleName="full-width"
            onPress={() => this.setState({ modalForm: { visible: false } })}
          >
            <Text styleName="bright">Cancel</Text>
          </Button>
        </View>
      );
  }

  render() {
    return (
      <View styleName="flexible">
        <DropForm />
        <View styleName="horizontal">
          <Button
            styleName='full-width'
            style={styles.deleteButton}
            onPress={() => this.setState({ modalForm: { visible: true } })}
          >
            <Text styleName="bold bright">
              Delete Drop
            </Text>
          </Button>
        </View>

        <ModalContainer
          visible={this.state.modalForm.visible}
          title={`Deleting ${this.props.drop.title}`}
        >
          <View styleName="md-gutter">
            <Text>
              Are you sure you want to delete this drop?
            </Text>
          </View>
          {this.renderModalButtons()}
        </ModalContainer>
      </View>
    );
  }
}

// Decorate the form component
const FormComponent = reduxForm({
  form: FORM_NAME, // a unique name for this form
  onSubmit: submit
})(DropEdit);

export default connect()(FormComponent);
