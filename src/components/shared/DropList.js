import React from 'react';
import { ListView, Row, Image, View, Subtitle, Caption, Icon, Button } from '@shoutem/ui'; 

const renderRow = ({ drop, onPressRow }) => {
  const {
    background,
    title,
    owner,
    distance
  } = drop;

  return (
    <Button
      styleName="tight clear"
      onPress={() => onPressRow(drop)}
    >
      <Row>
        <Image
          styleName="small rounded-corners"
          source={{ uri: background }}
        />
        <View styleName="vertical stretch space-between">
          <Subtitle>{title}</Subtitle>
          <Caption>by: {owner}</Caption>
          <Caption>{distance} km away</Caption>
        </View>
        <Icon styleName="disclosure" name="right-arrow" />
      </Row>
    </Button>
  );
};

export default ({ drops, onPressRow }) => {
  return (
    <ListView
      renderRow={(drop) => renderRow({ drop, onPressRow })}
      data={drops}
    />
  );
};
