import _ from 'lodash';
import * as l from '../../constants/loot';

const drink = (data, targetObj) => {
  const newData = _.clone(data);

  const oldTarget = Object.assign({}, targetObj);
  oldTarget.payload.loot = l.emptyBarrel;

  const newTarget = Object.assign({}, oldTarget);

  newData.splice(targetObj.index, 1, newTarget);

  return newData;
};

export default drink;
