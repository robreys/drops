import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { View, Button, Row, Text, Divider, Caption, Image } from '@shoutem/ui';
import { Field, FieldArray } from 'redux-form';
import { TextField } from '../common';
import ContentForm from './ContentForm';
import Colors from '../../resources/Colors';

const styles = {
  fieldLabel: {
    backgroundColor: Colors.darkBlue
  },
  addContentButton: {
    backgroundColor: Colors.blue
  },
  contentItemContainer: {
    padding: 0
  },
  contentItem: {
    backgroundColor: Colors.lightBlue
  }
};

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
    return (value && (
        <Text styleName="caption md-gutter-top md-gutter-bottom">
          {value}
        </Text>
      )) || null;
  }

  renderImage({ input: { value } }) {
    return (value && (
        <View
          styleName="flexible vertical v-center h-center"
        >
          <Image
            styleName="large-banner"
            source={{ uri: value }}
          />
        </View>
      )) || null; 
  }

  renderContentList({ fields }) {
    return (
      <View>
        {fields.map((item, index) => (
          <View
            styleName="sm-gutter rounded-corners"
            key={index}
          >
            <Button
              styleName="tight clear"
              onPress={this.editContent.bind(this, { item, index })}
            > 
              <Row 
                style={styles.contentItemContainer}
              >
                <View
                  styleName="vertical sm-gutter"
                  style={styles.contentItem}
                >
                  <Field name={`${item}.image`} component={this.renderImage} />
                  <Field name={`${item}.message`} component={this.renderMessage} />
                </View>
              </Row>
            </Button>
          </View>
        ))}

        <View styleName="horizontal sm-gutter">
          <Button
            style={styles.addContentButton}
            styleName="full-width"
            onPress={this.addContent.bind(this, { fields })}
          >
            <Text styleName="bright">Add Content</Text>
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
        <Divider styleName="section-header" style={styles.fieldLabel}>
          <Text styleName="md-gutter-left sm-gutter-bottom bold bright">
            Title
          </Text>
        </Divider>
        <Field
          name='title'
          component={TextField}
          placeholder='title'
        />
        <Divider styleName="section-header" style={styles.fieldLabel}>
          <Text styleName="md-gutter-left sm-gutter-bottom bold bright">
            Background (optional)
          </Text>
        </Divider>
        <Field
          name='background'
          component={TextField}
          placeholder='background url (.jpg | .png)'
        />
        <Divider styleName="section-header" style={styles.fieldLabel}>
          <Text styleName="md-gutter-left sm-gutter-bottom bold bright">
            Description
          </Text>
        </Divider>
        <Field
          multiline
          numberOfLines={4}
          name='description'
          component={TextField}
          placeholder='description'
        />
        <Divider styleName="section-header" style={styles.fieldLabel}>
          <Text styleName="md-gutter-left sm-gutter-bottom bold bright">
            Content
          </Text>
          <Caption styleName="bright">
            Click item to edit
          </Caption>
        </Divider>

        {/* Content List */}
        <FieldArray name="content" component={this.renderContentList.bind(this)} />
      </ScrollView>
    );
  }
}
