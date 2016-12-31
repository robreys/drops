import React from 'react';
import { Modal } from 'react-native';
import { View, Title, Text, Button } from '@shoutem/ui';
import Colors from '../../resources/Colors';

const styles = {
  titleContainer: {
    backgroundColor: Colors.darkBlue
  },
  titleActionText: {
    color: Colors.red
  }
};
const rendertitleAction = ({ titleAction, titleActionText }) => {
  return (titleAction && (
      <View>
        <Button 
          styleName="tight clear md-gutter-right"
          onPress={titleAction}
        >
          <Text style={styles.titleActionText}>{titleActionText}</Text>
        </Button>
      </View>
    )) || null;
};

export default (props) => {
  return (
    <Modal
      animationType='fade'
      onRequestClose={() => {}}
      transparent
      visible={props.visible}
    >
      <View
        styleName="flexible vertical v-center md-gutter"
        style={{ backgroundColor: 'rgba(0,0,0,.7)' }}
      >
        <View
          style={{ backgroundColor: 'white' }}
        >
          <View
            styleName="horizontal v-center"
            style={styles.titleContainer}
          >
            <View styleName="flexible" >
              <Title styleName="md-gutter bright">{props.title}</Title>
            </View>
            {rendertitleAction(props)}
          </View>

          {props.children}
        </View>
      </View>
    </Modal>
  );
};
