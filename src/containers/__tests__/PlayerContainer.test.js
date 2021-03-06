import React from 'react';
import PlayerContainer from '../PlayerContainer';
import * as p from '../PlayerContainer';
import * as l from '../../constants/loot';

import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';

describe('`faceDirection` PlayerContainer component function', () => {
  it('should return a value used to calculate `backgroundPosition`', () => {
    expect(p.faceDirection('north')).toBe(-8);
    expect(p.faceDirection('west')).toBe(-9);
    expect(p.faceDirection('south')).toBe(-10);
    expect(p.faceDirection('east')).toBe(-11);
    expect(p.faceDirection(null)).toBe(-10);
  });
});

describe('`setSpriteSheet` PlayerContainer component function', () => {
  it('should return a spritesheet variable based on the `weaponName` argument', () => {
    expect(p.setSpriteSheet(l.weapons.fists.name)).toBeDefined();
    expect(p.setSpriteSheet(l.weapons.dagger.name)).toBeDefined();
    expect(p.setSpriteSheet(l.weapons.spear.name)).toBeDefined();
  });
});

describe('`setAnimationClass` PlayerContainer component function', () => {
  it('should return an empty string if `playerAnimation` is empty', () => {
    expect(p.setAnimationClass(null, null, 'south')).toBe('');
    expect(p.setAnimationClass(null, '', 'test')).toBe('');
  });

  it('should return a className based on the `weapon`, `playerAnimation`, and `facing` arguments if `playerAnimation` is `attack`', () => {
    expect(p.setAnimationClass(l.weapons.fists.name, 'attack', 'east')).toBe('slash-attack-east');
    expect(p.setAnimationClass(l.weapons.dagger.name, 'attack', 'west')).toBe('slash-attack-west');
    expect(p.setAnimationClass(l.weapons.spear.name, 'attack', 'south')).toBe(
      'thrust-attack-south'
    );
  });

  it('should return a className based on the `playerAnimation` and `facing` arguments if `playerAnimation` is `move`', () => {
    expect(p.setAnimationClass(null, 'move', 'east')).toBe('move-east');
  });
});

describe('PlayerContainer component', () => {
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
    // Requires full mount to include store since PlayerContainer
    // is a connected component. Shallow mount won't work
    const player = mount(<PlayerContainer store={store} {...props} />);
    expect(player.find(PlayerContainer)).toHaveLength(1);
  });
});
