import _ from 'lodash';

// Opens portals
export const open = (data, targetPosition, targetObj) => {
  // Essentially just splice a single new value (direction) into the current player object
  let newData = _.clone(data);
  newData.splice(
    targetPosition.index,
    1,
    Object.assign({}, targetObj, { payload: { portal: { closed: false, open: true } } })
  );

  return newData;
};
