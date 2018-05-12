import _ from 'lodash';
import * as h from '../../actions/index.helpers';

// Validates basic movement actions
const move = (data, playerPosition, targetObj) => {
  // Avoiding mapping through all the cells in this function based on a hypothesis about performance

  // Shallow clone
  let newData = _.clone(data);

  // The player is no longer at its current position
  const currentPlayerObj = data[playerPosition.index];
  const formerObj = Object.assign({}, currentPlayerObj);
  delete formerObj.payload.player;
  newData.splice(playerPosition.index, 1, formerObj);

  // The player is at the next position
  const newObj = Object.assign({}, targetObj);

  // Don't overwrite other payloads when updating the object
  const direction = h.getDirection(playerPosition, targetObj);
  newObj.payload
    ? (newObj.payload.player = { facing: direction })
    : (newObj.payload = { player: { facing: direction } });
  newData.splice(targetObj.index, 1, newObj);

  return {
    data: newData,
    playerPosition: {
      coordinates: targetObj.coordinates,
      index: targetObj.index,
    },
  };
};

export default move;
