import React from 'react';
import { Screen, View, Row, Title, Text, Image, ListView, Lightbox } from '@shoutem/ui';
import Colors from '../resources/Colors';
  
const styles = {
  rowStyle: {
    padding: 0
  },
  contentItemContainer: {
    padding: 0
  },
  contentItem: {
    backgroundColor: Colors.lightBlue
  }
};

const renderMessage = ({ message }) => {
  return (message && (
      <Text styleName="caption md-gutter-top md-gutter-bottom">
        {message}
      </Text>
    )) || null;
};

const renderImage = ({ image }) => {
  return (image && (
      <Lightbox>
        <View
          styleName="flexible vertical v-center h-center"
        >
          <Image
            styleName="large-banner"
            source={{ uri: image }}
          />
        </View>
      </Lightbox>
    )) || null;
};

const renderRow = (item) => {
  return (
      <View
        styleName="sm-gutter rounded-corners"
      >
        <Row 
          style={styles.contentItemContainer}
        >
          <View
            styleName="vertical sm-gutter"
            style={styles.contentItem}
          >
            {renderImage(item)}
            {renderMessage(item)}
          </View>
        </Row>
      </View>
    );
};

const renderContentList = ({ content }) => {
  if (content) {
    return (
        <View styleName="sm-gutter">
          <ListView
            renderRow={renderRow}
            data={content}
          />
        </View>
      );
  }

  return (
      <View styleName="sm-gutter flexible vertical v-center h-center">
        <Title styleName="lg-gutter">no content</Title>
      </View>
    );
};

export default ({ content }) => {
  return (
      <Screen styleName="flexible">
        {renderContentList({ content })}
      </Screen>
    );
};
