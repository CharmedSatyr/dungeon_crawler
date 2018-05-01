import _ from 'lodash';

// Opens portals
const open = (data, targetObj) => {
  // Essentially just splice a single new value (direction) into the current player object
  let newData = _.clone(data);
  const newObj = Object.assign({}, targetObj, { payload: { portal: { open: true } } });

  newData.splice(targetObj.index, 1, newObj);

  return newData;
};

export default open;
