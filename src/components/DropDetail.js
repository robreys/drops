import React, { Component } from 'react';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { ScrollView } from 'react-native';
import { Image, Overlay, Text, Title, Caption, Row, Button, Divider, View } from '@shoutem/ui';
import { isInUnlockRange } from '../utils';

export default class extends Component {
  renderContentButton() {
    const { distance, title, content } = this.props.drop;

    if (isInUnlockRange(distance)) {
      return (
        <Button
          styleName="dark"
          onPress={() => Actions.dropContent({ content, dropTitle: title })}
        >
          <Text>VIEW CONTENT</Text>
        </Button>
      );
    }
  }

  render() {
    const {
      title,
      owner,
      description,
      background,
      lastUpdated
    } = this.props.drop;

    return (
      <View styleName="flexible">
        <ScrollView>
          <Image
            styleName="large-banner"
            source={{ uri: background }} 
          >
            <Overlay styleName="fill-parent">
                <Title styleName="sm-gutter-bottom">
                  {title.toUpperCase()}
                </Title>
                <Caption>{owner}</Caption>
                <Caption>{moment(lastUpdated).fromNow()}</Caption>
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
        </ScrollView>
        
        {this.renderContentButton()}
      </View>
    );
  }
}
