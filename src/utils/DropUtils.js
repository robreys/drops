const UNLOCK_RANGE = 0.006; // 0.006 km ~ 20 ft

export const isInUnlockRange = (distance) => {
  return true;
  // return distance && distance <= UNLOCK_RANGE;
};
