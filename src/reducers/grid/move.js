import _ from 'lodash';
import * as h from '../../actions/index.helpers';

// Validates basic movement actions
const move = (data, originPosition, targetObj) => {
  // Make some copies of the arrays and objects to avoid directly modifying them
  // The reducer should be a pure function
  const newData = _.clone(data);
  const currentCharacterObj = data[originPosition.index];
  const formerObj = Object.assign({}, currentCharacterObj); // Making a copy to avoid directly modifying the array; the reducer should do that
  const newObj = Object.assign({}, targetObj);

  // Determine whether an enemy or player is moving
  let characterType;
  // The player will move by default
  if (formerObj.payload.player) {
    characterType = 'player';
    // Enemy movement is an `else if`
  } else if (formerObj.payload.enemy) {
    characterType = 'enemy';
  }

  // Find the direction they should face
  const direction = h.getDirection(originPosition, targetObj);

  // Temp variable
  let characterPayload;

  if (characterType === 'player') {
    // Copy the former payload data
    characterPayload = formerObj.payload.player;
    // Update its facing direction
    characterPayload.facing = direction;
    // Delete the data from the formerObj
    delete formerObj.payload.player;
    // add it to the newObj
    newObj.payload.player = characterPayload;
  } else if (characterType === 'enemy') {
    characterPayload = formerObj.payload.enemy;
    characterPayload.facing = direction;
    delete formerObj.payload.enemy;
    newObj.payload.enemy = characterPayload;
  }
  // Update the originPosition in the array
  newData.splice(originPosition.index, 1, formerObj);
  // Update the targetObj in the array
  newData.splice(targetObj.index, 1, newObj);

  // Return the updated data array and position
  return {
    data: newData,
    position: {
      coordinates: targetObj.coordinates,
      index: targetObj.index,
    },
  };
};

export default move;
