const gridData = [];
const populate = number => {
  for (let i = 0; i < number; i++) {
    gridData.push({
      alive: false
    });
  }
};
populate(40);

const initialState = { gridData };

const grid = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_CELL':
      return state.map((cell, index) => {
        if (index === action.index) {
          return Object.assign({}, cell, {
            alive: !cell.alive
          });
        }
        return cell;
      });
    default:
      return initialState.gridData;
  }
};

export default grid;
