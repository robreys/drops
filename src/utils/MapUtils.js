const DELTA_PADDING = 0.0004;

const calcMidpoint = (coord1, coord2) => {
  return {
    latitude: (coord1.latitude + coord2.latitude) / 2,
    longitude: (coord1.longitude + coord2.longitude) / 2
  };
};

const calcMidpointDelta = (val1, val2) => {
  return (Math.abs(val1 - val2) / 2) + DELTA_PADDING;
};

export const calcRegion = (coord1, coord2) => {
  const { latitude, longitude } = calcMidpoint(coord1, coord2);
  const latitudeDelta = calcMidpointDelta(coord1.latitude, coord2.latitude);
  const longitudeDelta = calcMidpointDelta(coord1.longitude, coord2.longitude);

  return { latitude, longitude, latitudeDelta, longitudeDelta };
};
