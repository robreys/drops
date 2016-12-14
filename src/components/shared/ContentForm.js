import React, { Component } from 'react';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import { View, Divider, Text, Title, TextInput, Button } from '@shoutem/ui';
import { closeContentForm, contentUpdate, dropAddContent, dropEditContent, dropDeleteContent } from '../../actions';

class ContentForm extends Component {
  onMessageChange(value) {
    this.props.contentUpdate({ prop: 'message', value });
  }

  onImageChange(value) {
    this.props.contentUpdate({ prop: 'image', value });
  }

  onDeleteContent() {
    const { formContent } = this.props;
    const { uid } = formContent;

    this.props.dropDeleteContent({ uid });
  }

  onAddContent() {
    const { formContent } = this.props;

    this.props.dropAddContent({ value: formContent });
  }

  onEditContent() {
    const { formContent } = this.props;
    const { uid, message, image } = formContent;

    this.props.dropEditContent({ uid, value: { message, image } });
  }

  renderTitle() {
    if (this.props.formEdit) {
      return (
        <View styleName="horizontal v-center">
          <View styleName="flexible" >
            <Title styleName="md-gutter-left">Edit Content</Title>
          </View>
          <View>
            <Button 
              styleName="tight md-gutter-right"
              onPress={this.onDeleteContent.bind(this)}
            >
              <Text style={{ color: 'red' }}>DELETE</Text>
            </Button>
          </View>
        </View>);
    }

    return (<Title styleName="md-gutter-left">Add Content</Title>);
  }

  renderActions() {
    const { formEdit } = this.props;

    const completeText = (formEdit) ? 'DONE' : 'ADD';

    return (
      <View styleName="horizontal flexible lg-gutter-top md-gutter-bottom">
        <Button
          styleName="confirmation dark"
          onPress={formEdit ? this.onEditContent.bind(this) : this.onAddContent.bind(this)}
        >
          <Text>{completeText}</Text>
        </Button>

        <Button
          styleName="confirmation dark"
          onPress={this.props.closeContentForm}
        >
          <Text>CANCEL</Text>
        </Button>
      </View>
    );
  }

  render() {
    const { formVisible, formContent } = this.props;
    const { message, image } = formContent;

    return (
      <Modal
        animationType='fade'
        onRequestClose={() => {}}
        transparent
        visible={formVisible}
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
            <TextInput 
              value={message}
              onChangeText={this.onMessageChange.bind(this)}
            />

            <Divider styleName="section-header">
            <Text styleName="md-gutter-left sm-gutter-bottom bold">Image URL</Text>
            </Divider>
            <TextInput 
              value={image}
              onChangeText={this.onImageChange.bind(this)}
            />

            <View styleName="horizontal sm-gutter-bottom">
              {this.renderActions()}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  const { formEdit, formVisible, formContent } = state.dropForm;

  return { formEdit, formVisible, formContent };
};

export default connect(mapStateToProps, { 
  closeContentForm,
  contentUpdate,
  dropAddContent,
  dropEditContent,
  dropDeleteContent
})(ContentForm);
