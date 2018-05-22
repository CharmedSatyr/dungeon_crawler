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
  it('should return a spritesheet variable based on the `weaponName` argument', () => {
    expect(p.setSpriteSheet(l.weapons.fists.name)).toBeDefined();
    expect(p.setSpriteSheet(l.weapons.dagger.name)).toBeDefined();
    expect(p.setSpriteSheet(l.weapons.spear.name)).toBeDefined();
  });
});

describe('`setPlayerClass` Player component function', () => {
  it('should return `sprite` if `playerAnimation` is empty', () => {
    expect(p.setPlayerClass(null, null, 'south')).toBe('sprite');
    expect(p.setPlayerClass(null, '', 'test')).toBe('sprite');
  });

  it('should return a className based on the `weapon`, `playerAnimation`, and `facing` arguments if `playerAnimation` is `attack`', () => {
    expect(p.setPlayerClass(l.weapons.fists.name, 'attack', 'east')).toBe(
      'sprite slash-attack-east'
    );
    expect(p.setPlayerClass(l.weapons.dagger.name, 'attack', 'west')).toBe(
      'sprite slash-attack-west'
    );
    expect(p.setPlayerClass(l.weapons.spear.name, 'attack', 'south')).toBe(
      'sprite thrust-attack-south'
    );
  });

  it('should return a className based on the `playerAnimation` and `facing` arguments if `playerAnimation` is `move`', () => {
    expect(p.setPlayerClass(null, 'move', 'east')).toBe('sprite move-east');
  });
});

describe('Player component', () => {
  const initialState = {
    animation: { player: '' },
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
