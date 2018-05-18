import _ from 'lodash';

const add_item = (data, targetObj) => {
  const newData = _.clone(data);

  const oldTarget = Object.assign({}, targetObj);
  delete oldTarget.payload.loot;

  const newTarget = Object.assign({}, oldTarget);

  newData.splice(targetObj.index, 1, newTarget);

  return newData;
};

export default add_item;
