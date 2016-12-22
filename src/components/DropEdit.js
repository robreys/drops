import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { View, Button, Text } from '@shoutem/ui';
import DropForm from './shared/DropForm';
import { dropEdit, dropDelete } from '../actions';

class DropEdit extends Component {
  componentWillMount() {
    this.props.dropEdit({ uid: this.props.drop.uid });
  }

  onDelete() {
    Alert.alert(
      `Deleting ${this.props.drop.title}`,
      'Are you sure you want to delete this drop?',
      [
        {
          text: 'DELETE',
          onPress: () => this.props.dropDelete({ uid: this.props.drop.uid })
        }, {
          text: 'CANCEL',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ]
    );
  }

  render() {
    const { deleteButtonStyle, deleteTextStyle } = styles;

    return (
      <View styleName="flexible">
        <DropForm drop={this.props.drop} />
        <Button
          style={deleteButtonStyle}
          onPress={this.onDelete.bind(this)}
        >
          <Text style={deleteTextStyle}>DELETE DROP</Text>
        </Button>
      </View>
    );
  }
}

const styles = {
  deleteButtonStyle: {
    backgroundColor: '#F44336'
  },
  deleteTextStyle: {
    color: 'white'
  }
};

export default connect(null, { dropEdit, dropDelete })(DropEdit);
