// Determine tile types given a level
const tileTypes = (level, type = 'default') => {
  if (type === 'path') {
    // The floor type is dirt until level 2, when it's stone
    return level < 2 ? 'dirtPath' : 'stonePath';
  }
  if (level < 2) {
    return 'vines';
  }
  if (level === 2) {
    return 'rock1';
  }
  return 'lava';
};

export default tileTypes;
