import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { View, Button, Row, Text, Divider, Caption, Image } from '@shoutem/ui';
import { Field, FieldArray } from 'redux-form';
import { TextField } from '../common';
import ContentForm from './ContentForm';

export default class extends Component {
  state = {
    modalForm: {
      visible: false,
      item: '',
      index: -1,
      editMode: false
    }
  };

  editContent({ item, index }) {
    this.showModal({ item, index, editMode: true });
  }

  addContent({ fields }) {
    const index = fields.length;
    const item = `content[${index}]`;

    fields.push({});
    this.showModal({ item, index, editMode: false });
  }

  closeModal() {
    this.setState({ modalForm: { visible: false } });
  }

  showModal({ item, index, editMode }) {
    this.setState({ modalForm: { visible: true, item, index, editMode } });
  }

  renderMessage({ input: { value } }) {
    if (value) {
      return (
        <Row>
          <Text styleName="caption">{value}</Text>
        </Row>
      );
    }

    return null;
  }

  renderImage({ input: { value } }) {
    if (value) {
      return (
        <View
          style={{ marginBottom: 0 }}
          styleName="flexible vertical v-center h-center"
        >
          <Image
            styleName="large-banner"
            source={{ uri: value }}
          />
        </View>
      ); 
    } 

    return null;
  }

  renderContentList({ fields }) {
    return (
      <View>
        {fields.map((item, index) => (
          <View
            key={index}
            styleName="sm-gutter-top"
          >
            <Button
              styleName="tight clear"
              onPress={this.editContent.bind(this, { item, index })}
            > 
              <Row>
                <View styleName="vertical">
                  <Field name={`${item}.image`} component={this.renderImage} />
                  <Field name={`${item}.message`} component={this.renderMessage} />
                </View>
              </Row>
            </Button>
          </View>
        ))}

        <View styleName="horizontal">
          <Button
            styleName="full-width dark"
            onPress={this.addContent.bind(this, { fields })}
          >
            <Text>ADD CONTENT</Text>
          </Button>
        </View>

        <ContentForm
          onComplete={this.closeModal.bind(this)}
          fields={fields}
          {...this.state.modalForm}
        />
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        {/* General Text Fields */}
        <Divider styleName="section-header">
          <Text styleName="md-gutter-left sm-gutter-bottom bold">Title</Text>
        </Divider>
        <Field
          name='title'
          component={TextField}
          placeholder='title'
        />
        <Divider styleName="section-header">
          <Text styleName="md-gutter-left sm-gutter-bottom bold">Background URL</Text>
        </Divider>
        <Field
          name='background'
          component={TextField}
          placeholder='background url'
        />
        <Divider styleName="section-header">
          <Text styleName="md-gutter-left sm-gutter-bottom bold">Description</Text>
        </Divider>
        <Field
          multiline
          numberOfLines={4}
          name='description'
          component={TextField}
          placeholder='description'
        />
        <Divider styleName="section-header">
          <Text styleName="md-gutter-left sm-gutter-bottom bold">Content</Text>
          <Caption>Click item to edit</Caption>
        </Divider>

        {/* Content List */}
        <FieldArray name="content" component={this.renderContentList.bind(this)} />
      </ScrollView>
    );
  }
}
