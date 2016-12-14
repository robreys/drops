import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from '@shoutem/ui';
import DropForm from './shared/DropForm';
import { dropEdit } from '../actions';

class DropEdit extends Component {
  componentWillMount() {
    this.props.dropEdit({ uid: this.props.drop.uid });
  }

  render() {
    return (
      <View styleName="flexible">
        <DropForm drop={this.props.drop} />
      </View>
    );
  }
}

export default connect(null, { dropEdit })(DropEdit);
