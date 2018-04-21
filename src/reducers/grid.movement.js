// Validates basic movement actions
export const movement = (data, playerPosition, direction, targetPosition, targetObj) => {
  // Avoiding mapping through all the cells in this function based on a hypothesis about performance

  // This way of deep copying the data array works so long as there are no methods stored in data!
  let newData = JSON.parse(JSON.stringify(data));

  // The player is no longer at its current position
  // Don't overwrite other payloads when updating the object
  const currentPlayerObj = data[playerPosition.index];
  const formerObj = Object.assign({}, currentPlayerObj);
  formerObj.payload.player = false;
  newData.splice(playerPosition.index, 1, formerObj);

  // The player is at the next position
  // Don't overwrite other payloads when updating the object
  const newObj = Object.assign({}, targetObj);
  newObj.payload
    ? (newObj.payload.player = { facing: direction })
    : (newObj.payload = { player: { facing: direction } });
  newData.splice(targetPosition.index, 1, newObj);

  return {
    data: newData,
    playerPosition: {
      coordinates: targetPosition.coordinates,
      index: targetPosition.index
    }
  };
};
