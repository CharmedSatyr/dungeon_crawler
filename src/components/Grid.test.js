import React from 'react';
import { shallow } from 'enzyme';
import Grid from './Grid';
import Cell from './Cell';
import TOTAL_CELLS from '../constants/settings';

const setup = () => {
  const mockGridData = [];
  for (let i = 0; i < TOTAL_CELLS; i++) {
    mockGridData.push({ player: false });
  }

  const props = {
    gridData: mockGridData,
    toggleCell: jest.fn(),
    updatePosition: jest.fn()
  };

  const grid = shallow(<Grid {...props} />);
  const cell = shallow(<Cell />);

  return {
    cell,
    grid,
    props
  };
};

describe('Grid component', () => {
  it('should render without crashing', () => {
    const { grid } = setup();
    expect(grid).toHaveLength(1);
  });
  it('should render `TOTAL_CELLS` cells', () => {
    const { cell, grid, props } = setup();
    expect(grid).toContain(props.gridData);
    console.log(grid);
    // expect(cell).toHaveLength(props.gridData.length);
  });
});

//   it('should display the index', () => {
//     const { cell, props } = setup();
//     expect(cell.text()).toContain(props.index);
//   });
//
//   it('should call `fn` on click', () => {
//     const { cell, props } = setup();
//     cell.simulate('click');
//     expect(props.fn.mock.calls.length).toEqual(1);
//   });
//
//   it('should toggle `.alive` class based on `props.alive` value', () => {
//     const { cell, props } = setup();
//     props.alive
//       ? expect(cell.find('.alive')).toHaveLength(1)
//       : expect(cell.find('.alive')).toHaveLength(0);
//   });
// });
