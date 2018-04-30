import _ from 'lodash';
import * as h from '../../actions/index.helpers';

// Changes the direction entities are facing
// Independent from movement so the player can face different directions even if no movement is possible--
// e.g., in corridors or when attacking
export const facing = (data, playerPosition, targetObj, flag) => {
  const newData = _.clone(data);
  // Default flag, called by player_input
  if (flag === 'player') {
    // Update the `facing` value of the current player object with inferred travel direction
    const direction = h.getDirection(playerPosition, targetObj);
    const player = data[playerPosition.index];
    const newObj = Object.assign({}, player);
    newObj.payload.player.facing = direction;
    newData.splice(playerPosition.index, 1, newObj);
  }

  // Enemy flag, called by hostile_enemies
  // This means the enemies should face the player
  if (flag === 'enemy' && targetObj.payload.enemy) {
    const direction = h.getDirection(targetObj, playerPosition);
    const enemy = targetObj;
    const newObj = Object.assign({}, enemy);
    newObj.payload.enemy.facing = direction;
    newData.splice(enemy.index, 1, newObj);
  }

  return newData;
};
