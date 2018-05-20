import React from 'react';
import Player from './index';
import * as p from './index';
import * as l from '../../constants/loot';

import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';

describe('`faceDirection` Player component function', () => {
  it('should return a value used to calculate `backgroundPosition`', () => {
    expect(p.faceDirection('north')).toBe(-8);
    expect(p.faceDirection('west')).toBe(-9);
    expect(p.faceDirection('south')).toBe(-10);
    expect(p.faceDirection('east')).toBe(-11);
    expect(p.faceDirection(null)).toBe(-10);
  });
});

describe('`setSpriteSheet` Player component function', () => {
  it('should return a spritesheet variable based on the `weapon` name received as a prop', () => {
    expect(p.setSpriteSheet(l.weapons.fists.name)).toBeDefined();
    expect(p.setSpriteSheet(l.weapons.dagger.name)).toBeDefined();
    expect(p.setSpriteSheet(l.weapons.spear.name)).toBeDefined();
  });
});

describe('Player component', () => {
  const initialState = {
    animation: { player: [] },
    player: {
      weapon: l.weapons.fists,
    },
  };
  const props = {
    facing: 'south',
  };

  const mockStore = configureMockStore();
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should render without crashing', () => {
    // Requires full mount to include store since Player
    // is a connected component. Shallow mount won't work
    const player = mount(<Player store={store} {...props} />);
    expect(player.find(Player)).toHaveLength(1);
  });
});
