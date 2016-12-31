import React, { Component } from 'react';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { ScrollView, StyleSheet, View as RNView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Image, Overlay, Text, Title, Caption, Row, Button, Divider, View } from '@shoutem/ui';
import { isInUnlockRange, calcRegion } from '../utils';
import _ezreal from '../resources/ezreal.png';
import _chest from '../resources/chest.png';
import Colors from '../resources/Colors';

const styles = {
  unlockButton: {
    backgroundColor: Colors.blue
  },
  fieldLabel: {
    backgroundColor: Colors.darkBlue
  },
  container: {
   height: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
  },
  map: {
   ...StyleSheet.absoluteFillObject,
  },
};

class DropDetail extends Component {
  state = {
    region: {}
  };

  componentWillMount() {
    const { position, drop: { location } } = this.props;
    const region = calcRegion(position, location);

    console.log('mounted', { position, location, region });
    this.setState({ region });
  }
  renderContentButton() {
    const { 
      position,
      drop: {
        title,
        content,
        location
      }
    } = this.props;

    if (isInUnlockRange(position, location)) {
      return (
        <View styleName="horizontal">
          <Button
            styleName='full-width'
            style={styles.unlockButton}
            onPress={() => Actions.dropContent({ content, dropTitle: title })}
          >
            <Text styleName="bold bright">View Content</Text>
          </Button>
        </View>
      );
    }
  }

  render() {
    const {
      position,
      drop: {
        title,
        owner,
        description,
        background,
        lastUpdated,
        location
      }
    } = this.props;

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

          <Divider styleName="section-header" style={styles.fieldLabel}>
            <Text styleName="md-gutter-left sm-gutter-bottom bold bright">Description</Text>
          </Divider>
          <Row>
            <Text>{description}</Text>
          </Row>

          <Divider styleName="section-header" style={styles.fieldLabel}>
            <Text styleName="md-gutter-left sm-gutter-bottom bold bright">Location</Text>
          </Divider>
          <RNView style={[styles.container, { width }]}>
           <MapView
             style={styles.map}
             region={this.state.region}
           >
            <MapView.Marker
              coordinate={location}
              title='le drop'
              image={_chest}
            />
            <MapView.Marker
              coordinate={position}
              title='y.o.u.'
              image={_ezreal}
            />
           </MapView>
          </RNView>
        </ScrollView>
        
        {this.renderContentButton()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { position } = state.location;

  return { position };
};

export default connect(mapStateToProps)(DropDetail);
