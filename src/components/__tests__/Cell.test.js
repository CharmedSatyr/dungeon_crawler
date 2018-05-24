import React from 'react';
import { shallow } from 'enzyme';
import * as c from '../Cell';

import Cell from '../Cell';
import Portal from '../Cell';

import Enemy from '../Enemy';
import Loot from '../Loot';
import Player from '../Player';

describe('`cellBG` Cell component function', () => {
  it('should return a `backgroundPosition` dependent on the `type` argument', () => {
    expect(c.cellBG('dirtPath')).toBe(c.dirtPath);
    expect(c.cellBG('stonePath')).toBe(c.stonePath);
    expect(c.cellBG('vines')).toBe(c.vines);
    expect(c.cellBG('rock1')).toBe(c.rock1);
    expect(c.cellBG('lava')).toBe(c.lava);
    expect(c.cellBG(undefined)).toBe(c.vines);
  });
});

describe('`display` Cell component function', () => {
  it('should return a component dependent upon the `payload` argument');
});

describe('`Cell` component', () => {
  it('should render without crashing', () => {
    const props = { payload: {}, type: '' };
    const cell = shallow(<Cell {...props} />);
    expect(cell).toHaveLength(1);
  });
});

//  it('should display the index', () => {
//    //    const { cell, props } = setup();
//    //    expect(cell.text()).toContain(props.index);
//  });
//
//  it('should call `fn` on click', () => {
//    //  const { cell, props } = setup();
//    //  cell.simulate('click');
//    //  expect(props.fn.mock.calls.length).toEqual(1);
//  });
//
//  it('should toggle `.player` class based on `props.player` value', () => {
//    //    const { cell, props } = setup();
//    //    props.player
//    //      ? expect(cell.find('.player')).toHaveLength(1)
//    //      : expect(cell.find('.player')).toHaveLength(0);
