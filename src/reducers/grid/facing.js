import _ from 'lodash';
import * as h from '../../actions/index.helpers';

// Changes the direction the player is facing
// Independent from movement so the player can face different directions even if no movement is possible
export const facing = (data, playerPosition, targetObj) => {
  // Essentially just splice a single new value (direction) into the current player object
  let newData = _.clone(data);
  const direction = h.getDirection(targetObj, playerPosition);

  // Don't overwrite other payloads when updating the object
  const updateObj = Object.assign({}, targetObj);

  if (updateObj.payload.player) {
    updateObj.payload.player.facing = direction;
  }

  if (updateObj.payload.enemy) {
    updateObj.payload.enemy.facing = direction;
  }

  newData.splice(targetObj.index, 1, updateObj);

  return newData;
};
