import React from 'react';
import { shallow } from 'enzyme';
import Cell from './index';
import * as i from './index';
import Enemy from '../Enemy';
import Loot from '../Loot';
import Portal from './index';
import Player from '../Player';

describe('`cellBG` Cell component function', () => {
  it('should return a `backgroundPosition` dependent on the `type` argument', () => {
    expect(i.cellBG('dirtPath')).toBe(i.dirtPath);
    expect(i.cellBG('stonePath')).toBe(i.stonePath);
    expect(i.cellBG('vines')).toBe(i.vines);
    expect(i.cellBG('rock1')).toBe(i.rock1);
    expect(i.cellBG('lava')).toBe(i.lava);
    expect(i.cellBG(undefined)).toBe(i.vines);
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
//  //  });
