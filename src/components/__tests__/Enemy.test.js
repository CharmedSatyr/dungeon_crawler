import React from 'react';
import Enemy from '../Enemy';
import * as e from '../Enemy';
import * as l from '../../constants/loot';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';

describe('`faceDirection` Enemy component function', () => {
  it('should return a value used to calculate `backgroundPosition`', () => {
    expect(e.faceDirection('north')).toBe(-4);
    expect(e.faceDirection('west')).toBe(-5);
    expect(e.faceDirection('south')).toBe(-6);
    expect(e.faceDirection('east')).toBe(-7);
    expect(e.faceDirection(null)).toBe(-6);
  });
});

describe('`setBackgroundPosition` Enemy component function', () => {
  it('should return a CSS background position', () => {
    expect(e.setBackgroundPosition(null, null, null)).toMatch(/\d+[px]? \d+[px]?/);
  });
});

describe('`setBackgroundImage` Enemy component function', () => {
  it('should be defined for `orc` type', () => {
    expect(e.setBackgroundImage('orc')).toBeDefined();
  });

  it('should be defined for `boss` type', () => {
    expect(e.setBackgroundImage('boss')).toBeDefined();
  });

  it('should be undefined for `kitty` type', () => {
    expect(e.setBackgroundImage('kitty')).toBeUndefined();
  });
});

describe('`setAnimationClass` Enemy component function', () => {
  it('should return an empty string if `enemyAnimation` is empty', () => {
    const enemyAnimation = {};
    expect(e.setAnimationClass(null, enemyAnimation, 'south', 0)).toBe('');
    expect(e.setAnimationClass(null, enemyAnimation, 'test', 0)).toBe('');
  });

  it('should return a className per `index` based on the `weapon`, `enemyAnimation`, and `facing` arguments if `enemyAnimation[index]` is `attack`', () => {
    const enemyAnimation = { 0: 'attack', 1: 'attack', 2: 'attack' };
    expect(e.setAnimationClass(l.weapons.fists.name, enemyAnimation, 'east', 0)).toBe(
      'slash-attack-east'
    );
    expect(e.setAnimationClass(l.weapons.dagger.name, enemyAnimation, 'west', 1)).toBe(
      'slash-attack-west'
    );
    expect(e.setAnimationClass(l.weapons.spear.name, enemyAnimation, 'south', 2)).toBe(
      'thrust-attack-south'
    );
  });

  it('should return a className per `index` based on the `enemyAnimation` and `facing` arguments if `enemyAnimation[index]` is `move`', () => {
    const enemyAnimation = { 0: 'move' };
    expect(e.setAnimationClass(null, enemyAnimation, 'east', 0)).toBe('move-east');
  });
});

describe('`Enemy` component', () => {
  const initialState = {
    animation: { enemy: { 0: 'attack' } },
  };
  const props = {
    facing: 'south',
    index: 0,
    stats: { health: 10, weapon: l.weapons.spear },
  };

  const mockStore = configureMockStore();
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should render without crashing', () => {
    const player = mount(<Enemy store={store} {...props} />);
    expect(player.find(Enemy)).toHaveLength(1);
  });
});
