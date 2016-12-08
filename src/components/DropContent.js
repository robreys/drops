import React from 'react';
import { Screen } from '@shoutem/ui';
import ContentList from './shared/ContentList';

export default ({ content }) => {
  return (
    <Screen styleName="flexible">
      <ContentList content={content} />
    </Screen>
  );
};
