import _ from 'lodash';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, ScrollView } from '@shoutem/ui';
import { initializeLocation, clearLocationReducer } from '../actions';
import DropList from './shared/DropList';

class NearbyDropList extends Component {
  componentWillMount() {
    this.props.initializeLocation();
    this.createDropList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //nextProps: next set of props component will be rendered with
    //this.props: old set of props
    this.createDropList(nextProps);
  }

  componentWillUnmount() {
    this.props.clearLocationReducer();
  }

  createDropList({ nearbyDrops }) {
    this.dropList = nearbyDrops;
  }

  render() {
    return (
      <View styleName="flexible">
        <ScrollView>
          <DropList
            drops={this.dropList}
            onPressRow={(drop) => Actions.dropDetail({ drop })}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const nearbyDrops = _.map(state.nearbyDrops, (value, uid) => {
    return { ...value, uid };
  });

  return { nearbyDrops };
};

export default connect(mapStateToProps, { initializeLocation, clearLocationReducer })(NearbyDropList);
