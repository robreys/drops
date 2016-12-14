import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View } from '@shoutem/ui';
import { fetchNearby } from '../actions';
import DropList from './shared/DropList';

class NearbyDropList extends Component {
  componentWillMount() {
    this.props.fetchNearby();
    this.createDropList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //nextProps: next set of props component will be rendered with
    //this.props: old set of props
    this.createDropList(nextProps);
  }

  createDropList({ nearbyDrops }) {
    console.log(nearbyDrops);
    this.dropList = nearbyDrops;
  }

  render() {
    return (
      <View styleName="flexible">
          <DropList
            drops={this.dropList}
            onPressRow={(drop) => Actions.dropDetail({ drop })}
          />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { nearbyDrops: state.nearbyDrops };
};

export default connect(mapStateToProps, { fetchNearby })(NearbyDropList);
