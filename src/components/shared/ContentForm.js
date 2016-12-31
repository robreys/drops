import React, { Component } from 'react';
import { View, Divider, Text, Button } from '@shoutem/ui';
import { Field } from 'redux-form';
import ModalContainer from './ModalContainer';
import { TextField } from '../common';
import Colors from '../../resources/Colors';

const styles = {
  fieldLable: {
    backgroundColor: Colors.darkBlue
  },
  completeButton: {
    backgroundColor: Colors.blue
  }
};

export default class extends Component {
  getTitle() {
    const { fields, index, editMode, onComplete } = this.props;
    const title = (editMode) ? 'Edit Content' : 'Add Content';
    const titleActionText = (editMode) ? 'Delete' : 'Cancel';
    const titleAction = () => {
        fields.remove(index);
        onComplete();
      };

    return { title, titleActionText, titleAction };
  }

  renderComplete() {
    const { onComplete } = this.props;

    return (
        <View styleName="horizontal sm-gutter">
          <Button
            style={styles.completeButton}
            styleName="full-width"
            onPress={onComplete}
          >
            <Text styleName="bright">Done</Text>
          </Button>
        </View>
      );
  }

  render() {
    const { visible, item } = this.props;

    return (
        <ModalContainer
          visible={visible}
          {...this.getTitle()}
        >
          <Divider style={styles.fieldLable} styleName="section-header">
            <Text styleName="md-gutter-left sm-gutter-bottom bold bright">Message</Text>
          </Divider>
          <Field
            name={`${item}.message`}
            component={TextField}
            placeholder='A secret message? ;)'
          />

          <Divider style={styles.fieldLable} styleName="section-header">
          <Text styleName="md-gutter-left sm-gutter-bottom bold bright">Image</Text>
          </Divider>
          <Field
            name={`${item}.image`}
            component={TextField}
            placeholder='image url (.jpg | .png)'
          />

          {this.renderComplete()}
        </ModalContainer>
      );
  }
}
