import React from 'react';
import { Modal } from 'react-native';
import { View, Divider, Text, Title, TextInput, Button } from '@shoutem/ui';

const renderTitle = (edit) => {
  if (edit) {
    return (
      <View styleName="horizontal v-center">
        <View styleName="flexible" >
          <Title styleName="md-gutter-left">Edit Content</Title>
        </View>
        <View>
          <Button styleName="tight md-gutter-right">
            <Text style={{ color: 'red' }}>DELETE</Text>
          </Button>
        </View>
      </View>);
  }

  return (<Title styleName="md-gutter-left">Add Content</Title>);
};

const renderActions = (edit, onComplete, onCancel) => {
  const completeText = (edit) ? 'DONE' : 'ADD';

  return (
    <View styleName="horizontal flexible lg-gutter-top md-gutter-bottom">
      <Button
        styleName="confirmation dark"
        onPress={onComplete}
      >
        <Text>{completeText}</Text>
      </Button>

      <Button
        styleName="confirmation dark"
        onPress={onCancel}
      >
        <Text>CANCEL</Text>
      </Button>
    </View>
  );
};

export default ({ content, edit, visible, onComplete, onCancel }) => {
  const { message, image } = content;

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
            {renderTitle(edit)}
          </View>

          <Divider styleName="section-header">
            <Text styleName="md-gutter-left sm-gutter-bottom bold">Message</Text>
          </Divider>
          <TextInput 
            value={message}
          />

          <Divider styleName="section-header">
          <Text styleName="md-gutter-left sm-gutter-bottom bold">Image URL</Text>
          </Divider>
          <TextInput 
            value={image}
          />

          <View styleName="horizontal sm-gutter-bottom">
            {renderActions(edit, onComplete, onCancel)}
          </View>
        </View>
      </View>
    </Modal>
  );
};
