// Changes the direction the player is facing
// Independent from movement so the player can face different directions even if no movement is possible
export const facing = (data, playerPosition, direction) => {
  // Essentially just splice a single new value (direction) into the current player object
  let newData = JSON.parse(JSON.stringify(data));
  const playerObj = data[playerPosition.index];
  // Don't overwrite other payloads when updating the object
  const updateObj = Object.assign({}, playerObj);
  updateObj.payload.player.facing = direction;
  newData.splice(playerPosition.index, 1, updateObj);

  return newData;
};
