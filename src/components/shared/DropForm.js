import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { TextInput, Text, Divider, Screen, Caption } from '@shoutem/ui';
import { dropUpdate } from '../../actions';
import ContentList from './ContentList';

class DropForm extends Component {
  componentWillMount() {
    //this.props = { ...this.props, ...this.props.drop };
    _.each(this.props.drop, (value, prop) => {
      this.props.dropUpdate({ prop, value });
    });
  }

  render() {
    const {
      title,
      description,
      background,
      content
    } = this.props;

    return (
      <ScrollView>
        <Divider styleName="section-header">
          <Text styleName="md-gutter-left sm-gutter-bottom bold">Background URL</Text>
        </Divider>
        <TextInput 
          value={background}
          onChangeText={value => this.props.dropUpdate({ prop: 'background', value })}
        />
        <Divider styleName="section-header">
          <Text styleName="md-gutter-left sm-gutter-bottom bold">Title</Text>
        </Divider>
        <TextInput 
          value={title}
          onChangeText={value => this.props.dropUpdate({ prop: 'title', value })}
        />
        <Divider styleName="section-header">
          <Text styleName="md-gutter-left sm-gutter-bottom bold">Description</Text>
        </Divider>
        <TextInput 
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={value => this.props.dropUpdate({ prop: 'description', value })}
        />
        <Divider styleName="section-header">
          <Text styleName="md-gutter-left sm-gutter-bottom bold">Content</Text>
          <Caption>Click item to edit</Caption>
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

const mapStateToProps = state => {
  const { title, description, background } = state.dropForm;

  const content = _.map(state.dropForm.content, (value, uid) => {
    return { ...value, uid };
  });
  
  return { title, description, background, content };
};

export default connect(mapStateToProps, { dropUpdate })(DropForm);
