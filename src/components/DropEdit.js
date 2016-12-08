import React from 'react';
import { View } from '@shoutem/ui';
import DropForm from './shared/DropForm';

export default ({ drop }) => {
  return (
    <View styleName="flexible">
      <DropForm drop={drop} />
    </View>
  );
};
