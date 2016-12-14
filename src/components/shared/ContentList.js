import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Row, Title, Text, Image, Button, ListView, Lightbox } from '@shoutem/ui';
import { addContent, editContent } from '../../actions';
import ContentForm from './ContentForm';

class ContentList extends Component {
  // state = { 
  //   formEdit: true,
  //   formVisible: false,
  //   formContent: {}
  // };

  // showEditForm(item) {
  //   this.setState({ 
  //     formEdit: true,
  //     formContent: item,
  //     formVisible: true
  //   });
  // }

  // showAddForm() {
  //   this.setState({
  //     formEdit: false,
  //     formContent: {},
  //     formVisible: true
  //   });
  // }

  // closeForm() {
  //   this.setState({
  //     formVisible: false
  //   });
  // }

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
    const { editable } = this.props;

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
        <Lightbox>
          <View styleName="flexible vertical v-center h-center">
            {imageComponent}
          </View>
        </Lightbox>
      );
    }
  }


  renderForm() {
    const { editable } = this.props;

    if (editable) {
      return (
        <ContentForm />
      );
    }
  }

  renderAdd() {
    const { editable } = this.props;

    if (editable) {
      return (
        <View styleName="horizontal">
            <Button
              styleName="full-width dark"
              onPress={() => this.props.addContent()}
            >
              <Text>ADD CONTENT</Text>
            </Button>
        </View>
      );
    }
  }

  renderRow(item) {
    const { editable } = this.props;
    const { rowStyle } = styles;

    let content = (
      <Row style={rowStyle}>
        <View styleName="vertical">
          {this.renderImage(item)}
          {this.renderMessage(item)}
        </View>
      </Row>
    );

    if (editable) {
      content = ( 
        <Button
          styleName="tight clear"
          onPress={() => this.props.editContent({ item })}
        > 
          {content}
        </Button>
      );
    }

    return (
      <View styleName="sm-gutter-top">
        {content}
      </View>
    );
  }

  render() {
    const { content } = this.props;

    if (content) {
      return (
        <View styleName="sm-gutter-left sm-gutter-right sm-gutter-bottom rounded-corners">
          <ListView
            renderRow={(item) => this.renderRow.bind(this)(item)}
            data={content}
          />
          {this.renderAdd()}
          {this.renderForm()}
        </View>
      );
    }

    return (
      <View styleName="sm-gutter flexible vertical v-center h-center">
        <Title styleName="lg-gutter">no content</Title>
        {this.renderAdd()}
        {this.renderForm()}
      </View>
    );
  }
}

const styles = {
  rowStyle: {
    padding: 0
  }
};

export default connect(null, { addContent, editContent })(ContentList);
