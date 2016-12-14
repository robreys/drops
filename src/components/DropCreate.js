import React, { Component } from 'react';
import { View } from '@shoutem/ui';
import { connect } from 'react-redux';
import { dropCreate } from '../actions';
import DropForm from './shared/DropForm';

class DropCreate extends Component {
  componentWillMount() {
    this.props.dropCreate();
  }

  render() {
    return (
      <View styleName="flexible">
        <DropForm drop={{}} />
      </View>
    );
  }
}

export default connect(null, { dropCreate })(DropCreate);
