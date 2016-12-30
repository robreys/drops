import React from 'react';
import { View, TextInput, Caption } from '@shoutem/ui';

export const TextField = (props) => {
  const { input: { onChange, value }, meta: { touched, error } } = props;

  return (
    <View>
      <TextInput
          onChangeText={text => onChange(text)}
          value={value}
          underlineColorAndroid="#E0E0E0"
          {...props}
      />
      {renderErrorMessage({ touched, error })}
    </View>
  );
};

const renderErrorMessage = ({ touched, error }) => {
  const { errorMessageStyle } = styles;
  if (touched && error) {
    return (
      <View styleName="horizontal h-center">
        <Caption style={errorMessageStyle}>{error}</Caption>
      </View>
    );
  }
};

const styles = {
  errorMessageStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    color: '#E53935'
  }
};
