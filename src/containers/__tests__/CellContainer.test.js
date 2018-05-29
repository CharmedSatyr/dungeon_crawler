import React from 'react';

import Cell from '../../components/Cell';
import CellContainer from '../CellContainer';

// import Enemy from '../../components/Enemy';
import Loot from '../../components/Loot';
import Portal from '../../components/Portal';
// import PlayerContainer from '../PlayerContainer';

import * as cc from '../CellContainer';

import { shallow, mount } from 'enzyme';

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
  const index = 0;

  // Because `PlayerContainer` and `Enemy` are connected components, testing that they render probably requires a mock store, etc.
  it(
    'should render both `PlayerContainer` and `Enemy` components if `payload.player` and `payload.enemy` are defined'
  );
  it('should render a `PlayerContainer` component if `payload.player` is defined');
  it('should render `Enemy` component if `payload.enemy` is defined');

  it('should render a `Loot` component if `payload.loot` is defined', () => {
    const payload = { loot: { variety: {} } };
    expect(mount(cc.display(payload, index)).find(Loot)).toHaveLength(1);
  });

  it('should render a `Portal` component if `payload.portal` is defined', () => {
    const payload = { portal: { open: false } };
    expect(mount(cc.display(payload, index)).find(Portal)).toHaveLength(1);
  });
});

describe('`CellContainer` component', () => {
  it('should render without crashing', () => {
    const props = { index: 0, payload: {}, type: '' };
    const cell = shallow(<CellContainer {...props} />);
    expect(cell).toHaveLength(1);
  });

  it('should mount an instance of `Cell` presentational component', () => {
    const props = { index: 0, payload: {}, type: '' };
    const cell = shallow(<CellContainer {...props} />);
    expect(cell.find(Cell)).toHaveLength(1);
  });
});
