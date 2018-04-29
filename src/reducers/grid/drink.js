import _ from 'lodash';

const drink = (data, targetObj) => {
  const newData = _.clone(data);

  const oldTarget = Object.assign({}, targetObj);
  oldTarget.payload.loot.type.barrel.full = false;
  const newTarget = oldTarget;

  newData.splice(targetObj.index, 1, newTarget);

  return newData;
};

export default drink;
