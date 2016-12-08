import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Row, TextInput, Button, Text, Divider, Screen } from '@shoutem/ui';
import ContentList from './ContentList';

export default class extends Component {
  render() {
    const {
      title,
      description,
      background,
      content
    } = this.props.drop;

    return (
      <ScrollView>
        <Divider styleName="section-header">
          <Text styleName="md-gutter-left sm-gutter-bottom bold">Background URL</Text>
        </Divider>
        <TextInput 
          value={background}
        />
        <Divider styleName="section-header">
          <Text styleName="md-gutter-left sm-gutter-bottom bold">Title</Text>
        </Divider>
        <TextInput 
          value={title}
        />
        <Divider styleName="section-header">
          <Text styleName="md-gutter-left sm-gutter-bottom bold">Description</Text>
        </Divider>
        <TextInput 
          multiline
          numberOfLines={4}
          value={description}
        />
        <Divider styleName="section-header">
          <Text styleName="md-gutter-left sm-gutter-bottom bold">Content</Text>
        </Divider>
        <Screen style={{ backgroundColor: '#E0E0E0' }}>
          <ContentList
            content={content} 
            editable
          />
        </Screen>
      </ScrollView>
    );
  }
}
