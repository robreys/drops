import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ScrollView } from 'react-native';
import { Image, Overlay, Text, Title, Caption, Row, Button, Divider, View } from '@shoutem/ui';

export default class extends Component {
  componentWillMount() {
    this.props = { ...this.props, ...this.props.drop };
  }

  render() {
    const {
      title,
      owner_username,
      description,
      background,
      last_updated,
      content
    } = this.props;

    return (
      <ScrollView>
        <Image
          styleName="large-banner"
          source={{ uri: background }} 
        >
          <Overlay styleName="fill-parent">
              <Title styleName="sm-gutter-bottom">
                {title.toUpperCase()}
              </Title>
              <Caption>{owner_username}</Caption>
              <Caption>{last_updated}</Caption>
          </Overlay>
        </Image>

        <Divider styleName="section-header">
          <Text styleName="md-gutter-left sm-gutter-bottom bold">Description</Text>
        </Divider>
        <Row>
          <Text>{description}</Text>
        </Row>

        <Divider styleName="section-header">
          <Text styleName="md-gutter-left sm-gutter-bottom bold">Location</Text>
        </Divider>
          <Image
            styleName="large-wide"
            source={{ uri: 'https://s-media-cache-ak0.pinimg.com/736x/a8/91/e4/a891e44888a77ed638af6192508feba1.jpg' }} 
          />

        <View styleName="sm-gutter">
          <Button
            styleName="full-width dark"
            onPress={() => Actions.dropContent({ content, dropTitle: title })}
          >
            <Text>VIEW CONTENT</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}
