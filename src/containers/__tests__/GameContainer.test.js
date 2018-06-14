import React from 'react';
import GameContainer from '../GameContainer';
import * as gc from '../GameContainer';
import * as l from '../../constants/loot';

import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';

describe('`clamp` component function', () => {
  it('should return a Number', () => {
    const num = 0;
    const [min, max] = [0, 0];
    expect(typeof gc.clamp(num, [min, max]) === 'number').toBeTruthy();
  });

  it('should work...');
});

describe('`viewport` component function', () => {
  /*
   * |-----+-----+-----+-----+-----+-----+-----+-----+-----+-----|
   * | 0,0 | 1,0 | 2,0 | 3,0 | 4,0 | 5,0 | 6,0 | 7,0 | 8,0 | 9,0 |
   * |=====+=====+=====+=====+=====+=====+=====+=====+=====+=====|
   */
  const grid = [
    { coordinates: { x: 0, y: 0 }, index: 0, payload: {} },
    { coordinates: { x: 1, y: 0 }, index: 1, payload: {} },
    { coordinates: { x: 2, y: 0 }, index: 2, payload: {} },
    { coordinates: { x: 3, y: 0 }, index: 3, payload: {} },
    { coordinates: { x: 4, y: 0 }, index: 4, payload: {} },
    { coordinates: { x: 5, y: 0 }, index: 5, payload: {} },
    { coordinates: { x: 6, y: 0 }, index: 6, payload: {} },
    { coordinates: { x: 7, y: 0 }, index: 7, payload: {} },
    { coordinates: { x: 8, y: 0 }, index: 8, payload: {} },
    { coordinates: { x: 9, y: 0 }, index: 9, payload: {} },
  ];
  const vw = 5;
  it('should return a grid viewWidth cells wide', () => {
    /*
   * |-----+-----+-----+-----+-----|
   * | 0,0 | 1,0 | 2,0 | 3,0 | 4,0 |
   * |=====+=====+=====+=====+=====|
   */
    expect(gc.viewport(grid, null, vw).length).toBe(vw);
  });

  it('should return viewWidth - 1 cells east of Player, if playerPosition x coordinate is 0', () => {
    /*
   * |-----+-----+-----+-----+-----|
   * |  P  | 1,0 | 2,0 | 3,0 | 4,0 |
   * |=====+=====+=====+=====+=====|
   */
    const playerPosition = {
      coordinates: {
        x: 0,
        y: 0,
      },
      index: 0,
    };
    const view = [
      { coordinates: { x: 0, y: 0 }, index: 0, payload: { player: {} } },
      { coordinates: { x: 1, y: 0 }, index: 1, payload: {} },
      { coordinates: { x: 2, y: 0 }, index: 2, payload: {} },
      { coordinates: { x: 3, y: 0 }, index: 3, payload: {} },
      { coordinates: { x: 4, y: 0 }, index: 4, payload: {} },
    ];
    expect(gc.viewport(grid, playerPosition, vw)).toEqual(view);
  });

  it('should return viewWidth - 2 cells east of Player, if playerPosition x coordinate is 1');
  /*
   * |-----+-----+-----+-----+-----|
   * | 0,0 |  P  | 2,0 | 3,0 | 4,0 |
   * |=====+=====+=====+=====+=====|
   */
  /*
   * |-----+-----+-----+-----+-----|
   * | 0,0 | 1,0 |  P  | 3,0 | 4,0 |
   * |=====+=====+=====+=====+=====|
   */
  /*
   * |-----+-----+-----+-----+-----|
   * | 0,0 | 1,0 | 2,0 |  P  | 4,0 |
   * |=====+=====+=====+=====+=====|
   */
  /*
   * |-----+-----+-----+-----+-----|
   * | 1,0 | 2,0 | 3,0 |  P  | 5,0 |
   * |=====+=====+=====+=====+=====|
   */
  /*
   * |-----+-----+-----+-----+-----|
   * | 2,0 | 3,0 | 4,0 |  P  | 6,0 |
   * |=====+=====+=====+=====+=====|
   */
  /*
   * |-----+-----+-----+-----+-----|
   * | 3,0 | 4,0 | 5,0 |  P  | 7,0 |
   * |=====+=====+=====+=====+=====|
   */
  /*
   * |-----+-----+-----+-----+-----|
   * | 4,0 | 5,0 | 6,0 |  P  | 8,0 |
   * |=====+=====+=====+=====+=====|
   */
  /*
   * |-----+-----+-----+-----+-----|
   * | 5,0 | 6,0 | 7,0 |  P  | 9,0 |
   * |=====+=====+=====+=====+=====|
   */
  /*
   * |-----+-----+-----+-----+-----|
   * | 5,0 | 6,0 | 7,0 | 8,0 |  P  |
   * |=====+=====+=====+=====+=====|
   */

  it('should return an array', () => {
    const grid = [];
    const playerPosition = {};
    expect(Array.isArray(gc.viewport(grid, playerPosition))).toBeTruthy();
  });

  it('should work...');
});

describe('`GameContainer` component', () => {
  const initialState = {
    grid: {
      data: [],
      playerPosition: {
        coordinates: {
          x: 1,
          y: 3,
        },
        index: expect.any(Number),
      },
    },
    messages: ['test'],
    player: {
      experience: 100,
      gold: 0,
      health: {
        current: 30,
        max: 45,
      },
      level: 4,
      weapon: {
        name: 'Machine Gun',
        min_damage: 100,
        max_damage: 250,
      },
      inventory: [l.weapons.fists, l.weapons.dagger],
    },
  };
  const props = {
    change_weapon: jest.fn(),
    gridData: initialState.grid.data,
    hostile_enemies: jest.fn(),
    next_level: jest.fn(),
    player: initialState.player,
    playerPosition: initialState.playerPosition,
    playerInput: jest.fn(),
  };

  const mockStore = configureMockStore();
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should render without crashing', () => {
    // Requires full mount to include store since Player
    // is a connected component. Shallow mount won't work
    const gameContainer = mount(<GameContainer store={store} {...props} />);
    expect(gameContainer.find(GameContainer)).toHaveLength(1);
  });

  it('should have `change_weapon` prop', () => {
    const gameContainer = mount(<GameContainer store={store} {...props} />);
    expect(gameContainer.props().change_weapon).toBe(props.change_weapon);
  });

  it('should invoke `change_weapon` function on spacebar press', () => {
    beforeEach(() => {
      const gameContainer = mount(<GameContainer store={store} {...props} />);
      gameContainer.simulate('keydown', {
        preventDefault() {},
        key: ' ',
        keyCode: 32,
        which: 32,
      });
      expect(gameContainer.props().change_weapon).toHaveBeenCalledTimes(1);
    });
  });
});
