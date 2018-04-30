import _ from 'lodash';

// Deals damage to an enemy
const attack = (data, targetObj, damage) => {
  // Avoiding mapping through all the cells in this function based on a hypothesis about performance

  // Shallow clone
  const newData = _.clone(data);
  const newObj = Object.assign({}, targetObj);
  const oldHealth = targetObj.payload.enemy.health;
  const newHealth = oldHealth - damage;

  newObj.payload.enemy.health = newHealth;
  newData.splice(targetObj.index, 1, newObj);

  return newData;
};

export default attack;
