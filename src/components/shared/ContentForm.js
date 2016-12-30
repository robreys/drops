import React, { Component } from 'react';
import { Modal } from 'react-native';
import { View, Divider, Text, Title, Button } from '@shoutem/ui';
import { Field } from 'redux-form';
import { TextField } from '../common';

export default class extends Component {
  renderTitle() {
    const { fields, index, editMode, onComplete } = this.props;
    const title = (editMode) ? 'Edit Content' : 'Add Content';
    const action = (editMode) ? 'DELETE' : 'CANCEL';

    return (
      <View styleName="horizontal v-center">
        <View styleName="flexible" >
          <Title styleName="md-gutter-left">{title}</Title>
        </View>
        <View>
          <Button 
            styleName="tight md-gutter-right"
            onPress={() => {
              fields.remove(index);
              onComplete();
            }}
          >
            <Text style={{ color: 'red' }}>{action}</Text>
          </Button>
        </View>
      </View>
    );
  }

  renderComplete() {
    const { editMode, onComplete } = this.props;
    const text = (editMode) ? 'DONE' : 'ADD';

    return (
      <View styleName="horizontal flexible lg-gutter-top md-gutter-bottom">
        <Button
          styleName="confirmation dark"
          onPress={onComplete}
        >
          <Text>{text}</Text>
        </Button>
      </View>
    );
  }

  render() {
    const { visible, item } = this.props;

    return (
      <Modal
        animationType='fade'
        onRequestClose={() => {}}
        transparent
        visible={visible}
      >
        <View
          styleName="flexible vertical v-center"
          style={{ backgroundColor: 'rgba(0,0,0,.7)' }}
        >
          <View style={{ backgroundColor: 'white' }}>
            <View styleName="vertical md-gutter-top md-gutter-bottom">
              {this.renderTitle()}
            </View>

            <Divider styleName="section-header">
              <Text styleName="md-gutter-left sm-gutter-bottom bold">Message</Text>
            </Divider>
            <Field
              name={`${item}.message`}
              component={TextField}
              placeholder='A secret message? ;)'
            />

            <Divider styleName="section-header">
            <Text styleName="md-gutter-left sm-gutter-bottom bold">Image URL</Text>
            </Divider>
            <Field
              name={`${item}.image`}
              component={TextField}
              placeholder='image url {.jpg | .png }'
            />

            <View styleName="horizontal sm-gutter-bottom">
              {this.renderComplete()}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
