import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View } from '@shoutem/ui';
import DropList from './shared/DropList';

const sampleDrops = [
  {
    title: 'op drop',
    distance_to: '5',
    owner_username: 'rock_lobster',
    description: 'hella drop',
    background: 'https://www.colourbox.com/preview/2332491-small-chocolate-drops-background.jpg',
    last_updated: '11/5/16',
    content: [
      {
        message: 'wsup'
      }, {
        message: 'ayo',
        image: 'https://pbs.twimg.com/profile_images/441744008008982528/HF6DAlGv.jpeg'
      }, {
        message: 'wsup'
      }, {
        message: 'ayo',
        image: 'https://pbs.twimg.com/profile_images/441744008008982528/HF6DAlGv.jpeg'
      },
    ]
  }, {
    title: 'swagger',
    distance_to: '6',
    owner_username: 'rock_lobster',
    background: 'https://www.colourbox.com/preview/2332491-small-chocolate-drops-background.jpg',
    last_updated: '11/5/16'
  }, {
    title: 'swagger',
    distance_to: '6',
    owner_username: 'rock_lobster',
    background: 'https://www.colourbox.com/preview/2332491-small-chocolate-drops-background.jpg',
    last_updated: '11/5/16'
  }, {
    title: 'swagger',
    distance_to: '6',
    owner_username: 'rock_lobster',
    background: 'https://www.colourbox.com/preview/2332491-small-chocolate-drops-background.jpg',
    last_updated: '11/5/16'
  }, {
    title: 'swagger',
    distance_to: '6',
    owner_username: 'rock_lobster',
    background: 'https://www.colourbox.com/preview/2332491-small-chocolate-drops-background.jpg',
    last_updated: '11/5/16'
  }, {
    title: 'swagger',
    distance_to: '6',
    owner_username: 'rock_lobster',
    background: 'https://www.colourbox.com/preview/2332491-small-chocolate-drops-background.jpg',
    last_updated: '11/5/16'
  }, {
    title: 'swagger',
    distance_to: '6',
    owner_username: 'rock_lobster',
    background: 'https://www.colourbox.com/preview/2332491-small-chocolate-drops-background.jpg',
    last_updated: '11/5/16'
  }
];

export default class extends Component {
  componentWillMount() {
    this.dataArray = sampleDrops;
  }

  render() {
    return (
      <View styleName="flexible">
          <DropList
            drops={this.dataArray}
            onPressRow={(drop) => Actions.dropDetail({ drop })}
          />
      </View>
    );
  }
}
