// Validates basic movement actions
export const movement = (data, playerPosition, direction, targetPosition, targetObj) => {
  // Avoiding mapping through all the cells in this function based on a hypothesis about performance

  // This way of deep copying the data array works so long as there are no methods stored in data!
  let newData = JSON.parse(JSON.stringify(data));

  // The player is no longer at its current position
  const currentPlayerObj = data[playerPosition.index];
  newData.splice(playerPosition.index, 1, Object.assign({}, currentPlayerObj, { player: false }));

  // The player is at the next position
  newData.splice(
    targetPosition.index,
    1,
    Object.assign({}, targetObj, { player: { facing: direction } })
  );

  return {
    data: newData,
    playerPosition: {
      coordinates: targetPosition.coordinates,
      index: targetPosition.index
    }
  };
};
