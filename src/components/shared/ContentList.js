import React, { Component } from 'react';
import { View, Row, Tile, Title, Text, Image, Button, ListView, Lightbox } from '@shoutem/ui';
import ContentForm from './ContentForm';

export default class extends Component {
  state = { 
    formEdit: true,
    formVisible: false,
    formContent: {
      message: '',
      image: ''
    }
  };

  showEditForm(item) {
    this.setState({ 
      formEdit: true,
      formContent: item,
      formVisible: true
    });
  }

  showAddForm() {
    this.setState({
      formEdit: false,
      formContent: {},
      formVisible: true
    });
  }

  closeForm() {
    this.setState({
      formVisible: false
    });
  }

  renderMessage({ message }) {
    if (message) {
      return (
        <Row>
          <Text styleName="caption">{message}</Text>
        </Row>
      );
    }
  }

  renderImage({ image }, editable) {
    if (image) {
      const imageComponent = (
        <View style={{ marginBottom: 0 }}>
        <Image
          styleName="large-banner"
          source={{ uri: image }}
        />
        </View>
      );

      if (editable) {
        return imageComponent;
      }

      return (
        <Lightbox onClose={() => {}}>
          <View styleName="flexible vertical v-center h-center">
            {imageComponent}
          </View>
        </Lightbox>
      );
    }
  }

  renderRow({ item, editable }) {
    const { rowStyle } = styles;

    let content = (
      <Row style={{ padding: 0}}>
        <View styleName="vertical">
          {this.renderImage(item, editable)}
          {this.renderMessage(item)}
        </View>
      </Row>
    );

    if (editable) {
      content = ( 
        <Button
          styleName="tight clear"
          onPress={() => { this.showEditForm(item); }}
        > 
          {content}
        </Button>
      );
    }

    return (
      <View style={rowStyle}>
        {content}
      </View>
    );
  }

  renderForm(editable) {
    if (editable) {
      return (
        <ContentForm 
          edit={this.state.formEdit}
          onComplete={this.closeForm.bind(this)}
          onCancel={this.closeForm.bind(this)}
          visible={this.state.formVisible}
          content={this.state.formContent}
        />
      );
    }
  }

  renderAdd(editable) {
    if (editable) {
      return (
        <View styleName="horizontal">
            <Button
              styleName="full-width dark"
              onPress={this.showAddForm.bind(this)}
            >
              <Text>ADD CONTENT</Text>
            </Button>
        </View>
      );
    }
  }

  render() {
    const { content, editable } = this.props;

    if (content) {
      return (
        <View styleName="sm-gutter-left sm-gutter-right sm-gutter-bottom rounded-corners">
          <ListView
            renderRow={(item) => this.renderRow({ item, editable })}
            data={content}
          />
          {this.renderAdd(editable)}
          {this.renderForm(editable)}
        </View>
      );
    }

    return (
      <View styleName="sm-gutter flexible vertical v-center h-center">
        <Title styleName="lg-gutter">no content</Title>
        {this.renderAdd(editable)}
      </View>
    );
  }
}

const styles = {
  rowStyle: {
    marginTop: 15
  }
};
