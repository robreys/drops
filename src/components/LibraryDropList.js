import _ from 'lodash';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View } from '@shoutem/ui';
import { fetchLibrary } from '../actions';
import DropList from './shared/DropList';

class LibraryDropList extends Component {
  componentWillMount() {
    this.props.fetchLibrary();
    this.createDropList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //nextProps: next set of props component will be rendered with
    //this.props: old set of props
    this.createDropList(nextProps);
  }

  createDropList({ libraryDrops }) {
    this.dropList = libraryDrops;
  }

  render() {
    return (
      <View styleName="flexible">
          <DropList
            drops={this.dropList}
            onPressRow={(drop) => Actions.dropEdit({ drop })}
          />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const libraryDrops = _.map(state.libraryDrops, (value, uid) => {
    return { ...value, uid };
  });
  
  return { libraryDrops };
};

export default connect(mapStateToProps, { fetchLibrary })(LibraryDropList);
