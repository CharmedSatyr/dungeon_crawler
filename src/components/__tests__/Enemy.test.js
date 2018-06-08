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

describe('`conditions` Enemy component function', () => {
  it('should do something...');
});

describe('`checkMove` Enemy component function', () => {
  const health = 100;

  it('should return a function to move enemies two cells west of the player east', () => {
    const moveEnemy = jest.fn();
    const clearAnimation = jest.fn();
    const gd = [
      { index: 0, payload: { enemy: {} }, type: 'dirtPath' },
      { index: 1, payload: {}, type: 'dirtPath' },
      { index: 2, payload: { player: {} }, type: 'dirtPath' },
    ];
    const ep = { index: 0 };
    const pp = { index: 2 };
    const to = gd[1];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should return a function to move enemies three cells west of the player east', () => {
    const moveEnemy = jest.fn();
    const clearAnimation = jest.fn();
    const gd = [
      { index: 0, payload: { enemy: {} }, type: 'dirtPath' },
      { index: 1, payload: {}, type: 'dirtPath' },
      { index: 2, payload: {}, type: 'dirtPath' },
      { index: 3, payload: { player: {} }, type: 'dirtPath' },
    ];
    const ep = { index: 0 };
    const pp = { index: 3 };
    const to = gd[1];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should return a function to move enemies two cells east of the player west', () => {
    const moveEnemy = jest.fn();
    const clearAnimation = jest.fn();
    const gd = [
      { index: 0, payload: { player: {} }, type: 'dirtPath' },
      { index: 1, payload: {}, type: 'dirtPath' },
      { index: 2, payload: { enemy: {} }, type: 'dirtPath' },
    ];
    const ep = { index: 2 };
    const pp = { index: 0 };
    const to = gd[1];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should return a function to move enemies three cells east of the player west', () => {
    const moveEnemy = jest.fn();
    const clearAnimation = jest.fn();
    const gd = [
      { index: 0, payload: { player: {} }, type: 'dirtPath' },
      { index: 1, payload: {}, type: 'dirtPath' },
      { index: 2, payload: {}, type: 'dirtPath' },
      { index: 3, payload: { enemy: {} }, type: 'dirtPath' },
    ];
    const ep = { index: 3 };
    const pp = { index: 0 };
    const to = gd[2];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should return a function to move enemies two cells north of the player south', () => {
    const moveEnemy = jest.fn();
    const clearAnimation = jest.fn();
    const gridWidth = 1;
    const gd = [
      { index: 0, payload: { enemy: {} }, type: 'dirtPath' },
      { index: 1, payload: {}, type: 'dirtPath' },
      { index: 2, payload: { player: {} }, type: 'dirtPath' },
    ];
    const ep = { index: 0 };
    const pp = { index: 2 };
    const to = gd[1];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should return a function to move enemies three cells north of the player south', () => {
    const moveEnemy = jest.fn();
    const clearAnimation = jest.fn();
    const gridWidth = 1;
    const gd = [
      { index: 0, payload: { enemy: {} }, type: 'dirtPath' },
      { index: 1, payload: {}, type: 'dirtPath' },
      { index: 2, payload: {}, type: 'dirtPath' },
      { index: 3, payload: { player: {} }, type: 'dirtPath' },
    ];
    const ep = { index: 0 };
    const pp = { index: 3 };
    const to = gd[1];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should return a function to move enemies two cells south of the player north', () => {
    const moveEnemy = jest.fn();
    const clearAnimation = jest.fn();
    const gridWidth = 1;
    const gd = [
      { index: 0, payload: { player: {} }, type: 'dirtPath' },
      { index: 1, payload: {}, type: 'dirtPath' },
      { index: 2, payload: { enemy: {} }, type: 'dirtPath' },
    ];
    const pp = { index: 0 };
    const ep = { index: 2 };
    const to = gd[1];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should return a function to move enemies three cells south of the player north', () => {
    const moveEnemy = jest.fn();
    const clearAnimation = jest.fn();
    const gridWidth = 1;
    const gd = [
      { index: 0, payload: { player: {} }, type: 'dirtPath' },
      { index: 1, payload: {}, type: 'dirtPath' },
      { index: 2, payload: {}, type: 'dirtPath' },
      { index: 3, payload: { enemy: {} }, type: 'dirtPath' },
    ];
    const pp = { index: 0 };
    const ep = { index: 3 };
    const to = gd[2];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should handle enemies at diagonals...');
  it('should handle obstacles...');

  it('should return `undefined` when enemies are in cells out of range', () => {
    const moveEnemy = jest.fn();
    const clearAnimation = jest.fn();
    const gd = [
      { index: 0, payload: { player: {} }, type: 'dirtPath' },
      { index: 1, payload: {}, type: 'dirtPath' },
      { index: 2, payload: {}, type: 'dirtPath' },
      { index: 3, payload: {}, type: 'dirtPath' },
      { index: 4, payload: { enemy: {} }, type: 'dirtPath' },
    ];
    const pp = { index: 0 };
    const ep = { index: 4 };
    expect(e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation)).toBeUndefined();
  });

  it('should not call `moveEnemy` when enemies are in cells out of range', () => {
    const moveEnemy = jest.fn();
    const clearAnimation = jest.fn();
    const gd = [
      { index: 0, payload: { player: {} }, type: 'dirtPath' },
      { index: 1, payload: {}, type: 'dirtPath' },
      { index: 2, payload: {}, type: 'dirtPath' },
      { index: 3, payload: {}, type: 'dirtPath' },
      { index: 4, payload: { enemy: {} }, type: 'dirtPath' },
    ];
    const pp = { index: 0 };
    const ep = { index: 4 };
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation);
    expect(moveEnemy).not.toHaveBeenCalled();
  });

  it('should call `clearAnimation` after a delay if `moveEnemy` has been called');

  it('should not call `clearAnimation` when enemies are in cells out of range', () => {
    // TODO: Specify timeout
    const moveEnemy = jest.fn();
    const clearAnimation = jest.fn();
    const gd = [
      { index: 0, payload: { player: {} }, type: 'dirtPath' },
      { index: 1, payload: {}, type: 'dirtPath' },
      { index: 2, payload: {}, type: 'dirtPath' },
      { index: 3, payload: {}, type: 'dirtPath' },
      { index: 4, payload: { enemy: {} }, type: 'dirtPath' },
    ];
    const pp = { index: 0 };
    const ep = { index: 4 };
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation);
    expect(clearAnimation).not.toHaveBeenCalled();
  });

  it('should return `undefined` if `enemyPosition` has no enemy payload', () => {
    const moveEnemy = jest.fn();
    const clearAnimation = jest.fn();
    const gd = [
      { index: 0, payload: { player: {} }, type: 'dirtPath' },
      { index: 1, payload: {}, type: 'dirtPath' },
      { index: 2, payload: {}, type: 'dirtPath' },
    ];
    const pp = { index: 0 };
    const ep = { index: 2 };
    expect(e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation)).toBeUndefined();
  });
});

describe('`Enemy` component', () => {
  const initialState = {
    animation: { enemy: { 0: 'attack' } },
    grid: {
      data: [],
      playerPosition: {
        coordinates: {
          x: 0,
          y: 0,
        },
        index: 0,
      },
    },
  };
  const props = {
    facing: 'south',
    index: 0,
    stats: { health: 10, weapon: l.weapons.spear },
    position: {
      coordinates: {
        x: 0,
        y: 0,
      },
      index: 0,
    },
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
