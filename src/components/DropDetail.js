import React, { Component } from 'react';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { ScrollView, StyleSheet, View as RNView, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
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

    const { width } = Dimensions.get('window');

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
          <RNView style={[styles.container, { width }]}>
           <MapView
             style={styles.map}
             region={{
               latitude: 37.78825,
               longitude: -122.4324,
               latitudeDelta: 0.015,
               longitudeDelta: 0.0121,
             }}
           />
          </RNView>
        </ScrollView>
        
        {this.renderContentButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   height: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});
