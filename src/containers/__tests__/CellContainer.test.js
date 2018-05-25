import React from 'react';

import Cell from '../../components/Cell';
import CellContainer from '../CellContainer';

import Enemy from '../../components/Enemy';
import Loot from '../../components/Loot';
import Portal from '../../components/Portal';
import PlayerContainer from '../PlayerContainer';

import * as cc from '../CellContainer';

import { shallow } from 'enzyme';

describe('`cellBG` Cell component function', () => {
  it('should return a `backgroundPosition` dependent on the `type` argument', () => {
    expect(cc.cellBG('dirtPath')).toBe(cc.dirtPath);
    expect(cc.cellBG('stonePath')).toBe(cc.stonePath);
    expect(cc.cellBG('vines')).toBe(cc.vines);
    expect(cc.cellBG('rock1')).toBe(cc.rock1);
    expect(cc.cellBG('lava')).toBe(cc.lava);
    expect(cc.cellBG(undefined)).toBe(cc.vines);
  });
});

describe('`display` Cell component function', () => {
  it('should render both `PlayerContainer` and `Enemy` components if `payload.player` and `payload.enemy` are defined', () => {
    const props = { payload: { enemy: { health: 0 }, player: {} }, type: '' };
    const cell = shallow(<CellContainer {...props} />);
    expect(cell.find(Enemy)).toHaveLength(1);
    expect(cell.find(PlayerContainer)).toHaveLength(1);
  });

  it('should render an `Enemy` component if `payload.enemy` is defined', () => {
    const props = { payload: { enemy: { health: 0 } }, type: '' };
    const cell = shallow(<CellContainer {...props} />);
    expect(cell.find(Enemy)).toHaveLength(1);
  });

  it('should render a `Loot` component if `payload.loot` is defined', () => {
    const props = { payload: { loot: {} }, type: '' };
    const cell = shallow(<CellContainer {...props} />);
    expect(cell.find(Loot)).toHaveLength(1);
  });

  it('should render a `Portal` component if `payload.portal` is defined', () => {
    const props = { payload: { portal: { open: false } }, type: '' };
    const cell = shallow(<CellContainer {...props} />);
    expect(cell.find(Portal)).toHaveLength(1);
  });

  it('should render a `PlayerContainer` component if `payload.player` is defined', () => {
    const props = { payload: { player: {} }, type: '' };
    const cell = shallow(<CellContainer {...props} />);
    expect(cell.find(PlayerContainer)).toHaveLength(1);
  });
});

describe('`CellContainer` component', () => {
  it('should render without crashing', () => {
    const props = { payload: {}, type: '' };
    const cell = shallow(<CellContainer {...props} />);
    expect(cell).toHaveLength(1);
  });

  it('should mount an instance of `Cell` presentational component', () => {
    const props = { payload: {}, type: '' };
    const cell = shallow(<CellContainer {...props} />);
    expect(cell.find(Cell)).toHaveLength(1);
  });
});
