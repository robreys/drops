import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Row, Title, Text, Image, ListView, Lightbox } from '@shoutem/ui';

class ContentList extends Component {
  renderMessage({ message }) {
    if (message) {
      return (
        <Row>
          <Text styleName="caption">{message}</Text>
        </Row>
      );
    }
  }

  renderImage({ image }) {
    if (image) {
      return (
        <Lightbox>
          <View styleName="flexible vertical v-center h-center">
            <View style={{ marginBottom: 0 }}>
              <Image
                styleName="large-banner"
                source={{ uri: image }}
              />
            </View>
          </View>
        </Lightbox>
      );
    }
  }


  renderRow(item) {
    const { rowStyle } = styles;

    return (
      <View styleName="sm-gutter-top">
        <Row style={rowStyle}>
          <View styleName="vertical">
            {this.renderImage(item)}
            {this.renderMessage(item)}
          </View>
        </Row>
      </View>
    );
  }

  render() {
    const { content } = this.props;

    if (content) {
      return (
        <View styleName="sm-gutter-left sm-gutter-right sm-gutter-bottom rounded-corners">
          <ListView
            renderRow={this.renderRow.bind(this)}
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
  }
}

const styles = {
  rowStyle: {
    padding: 0
  }
};

export default connect()(ContentList);
