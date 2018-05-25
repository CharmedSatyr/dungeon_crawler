import React from 'react';
import Game from '../Game';
import * as l from '../../constants/loot';

import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';

describe('`Game` container', () => {
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
    const game = mount(<Game store={store} {...props} />);
    expect(game.find(Game)).toHaveLength(1);
  });

  it('should have `change_weapon` prop', () => {
    const game = mount(<Game store={store} {...props} />);
    expect(game.props().change_weapon).toBe(props.change_weapon);
  });

  it('should invoke `change_weapon` function on spacebar press', () => {
    beforeEach(() => {
      const game = mount(<Game store={store} {...props} />);
      game.simulate('keydown', {
        preventDefault() {},
        key: ' ',
        keyCode: 32,
        which: 32,
      });
      expect(game.props().change_weapon).toHaveBeenCalledTimes(1);
    });
  });
});