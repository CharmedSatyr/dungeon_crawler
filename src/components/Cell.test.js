import React from 'react';
import { shallow } from 'enzyme';
import Cell from './Cell';

const setup = () => {
  const props = {
    alive: true,
    fn: jest.fn(),
    index: 0
  };
  const cell = shallow(<Cell {...props} />);
  return {
    props,
    cell
  };
};

describe('Cell component', () => {
  it('should render without crashing', () => {
    const { cell } = setup();
    expect(cell).toHaveLength(1);
  });

  it('should display the index', () => {
    const { cell, props } = setup();
    expect(cell.text()).toContain(props.index);
  });

  it('should call `fn` on click', () => {
    const { cell, props } = setup();
    cell.simulate('click');
    expect(props.fn.mock.calls.length).toEqual(1);
  });

  it('should toggle `.alive` class based on `props.alive` value', () => {
    const { cell, props } = setup();
    props.alive
      ? expect(cell.find('.alive')).toHaveLength(1)
      : expect(cell.find('.alive')).toHaveLength(0);
  });
});
