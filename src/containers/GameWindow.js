import React from 'react';
import Cell from '../presentations/Cell';
import './GameWindow.css';

const cellData = [];
const num = 40;
const populate = number => {
  for (let i = 0; i < number; i++) {
    let n = Math.round(Math.random());
    cellData.push({ alive: n === 0 ? false : true });
  }
};
populate(num);

const toggle = alive => {
  if (alive) {
    return false;
  } else {
    return true;
  }
};

const cells = cellData.map((item, index) => {
  return (
    <Cell
      key={index}
      alive={item.alive}
      index={index}
      fn={() => {
        console.log('Cell index:', index);
        console.log('Alive in the cellData?', cellData[index].alive);
        console.log('Alive in the item?', item.alive);
        cellData[index].alive = toggle(cellData[index].alive);
      }}
    />
  );
});

const GameWindow = () => <div className="GameWindow">{cells}</div>;

export default GameWindow;
