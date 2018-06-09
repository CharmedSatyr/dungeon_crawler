import React from 'react';
import Enemy from '../Enemy';
import * as e from '../Enemy';
import * as l from '../../constants/loot';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import tileTypes from '../../constants/tile-types';

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
  const level = 0;
  const pathType = tileTypes(level, 'path');
  const noHealth = 0;
  const health = 10;

  it('should return `false` if `health` <= 0', () => {
    const targetObj = { payload: {}, type: pathType };
    expect(e.conditions(targetObj, noHealth, level)).toBeFalsy();
  });

  it('should return `false` if the cell `type` is not `pathType`', () => {
    const targetObj = { payload: {}, type: tileTypes(level) };
    expect(e.conditions(targetObj, health, level)).toBeFalsy();
  });

  it('should return `false` if the `targetObj.payload` is `enemy`', () => {
    const targetObj = { payload: { enemy: {}, type: pathType } };
    expect(e.conditions(targetObj, health, level)).toBeFalsy();
  });

  it('should return `false` if the `targetObj.payload` is `portal`', () => {
    const targetObj = { payload: { portal: {}, type: pathType } };
    expect(e.conditions(targetObj, health, level)).toBeFalsy();
  });

  it('should return `false` if the `targetObj.payload` is `loot`', () => {
    const targetObj = { payload: { loot: {}, type: pathType } };
    expect(e.conditions(targetObj, health, level)).toBeFalsy();
  });

  it('should return `false` if the `targetObj.payload` is `prince`', () => {
    const targetObj = { payload: { prince: {}, type: pathType } };
    expect(e.conditions(targetObj, health, level)).toBeFalsy();
  });

  it('should return `true` if `health` > 0, the `targetObj.payload` is empty, and the cell `type` is `pathType`', () => {
    const targetObj = { payload: {}, type: pathType };
    expect(e.conditions(targetObj, health, level)).toBeTruthy();
  });
});

describe('`checkMove` Enemy component function', () => {
  const health = 100;
  const level = 0;
  const pathType = tileTypes(level, 'path');
  let moveEnemy, clearAnimation;
  beforeEach(() => {
    clearAnimation = jest.fn();
    moveEnemy = jest.fn();
  });

  // CARDINAL DIRECTIONS
  it('should return a function to move enemies two cells west of the player east', () => {
    const gridWidth = 3;
    const gd = [
      { index: 0, payload: { enemy: {} }, type: pathType },
      { index: 1, payload: {}, type: pathType },
      { index: 2, payload: { player: {} }, type: pathType },
    ];
    const ep = { index: 0 };
    const pp = { index: 2 };
    const to = gd[1];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should return a function to move enemies three cells west of the player east', () => {
    const gridWidth = 4;
    const gd = [
      { index: 0, payload: { enemy: {} }, type: pathType },
      { index: 1, payload: {}, type: pathType },
      { index: 2, payload: {}, type: pathType },
      { index: 3, payload: { player: {} }, type: pathType },
    ];
    const ep = { index: 0 };
    const pp = { index: 3 };
    const to = gd[1];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should return a function to move enemies two cells east of the player west', () => {
    const gridWidth = 3;
    const gd = [
      { index: 0, payload: { player: {} }, type: pathType },
      { index: 1, payload: {}, type: pathType },
      { index: 2, payload: { enemy: {} }, type: pathType },
    ];
    const ep = { index: 2 };
    const pp = { index: 0 };
    const to = gd[1];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should return a function to move enemies three cells east of the player west', () => {
    const gridWidth = 4;
    const gd = [
      { index: 0, payload: { player: {} }, type: pathType },
      { index: 1, payload: {}, type: pathType },
      { index: 2, payload: {}, type: pathType },
      { index: 3, payload: { enemy: {} }, type: pathType },
    ];
    const ep = { index: 3 };
    const pp = { index: 0 };
    const to = gd[2];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should return a function to move enemies two cells north of the player south', () => {
    /*
     * When gridWidth is 1, horizontal tests provide the right answer
     * |---+---|
     * | E | 1 |
     * |===+===|
     * | 2 | 3 |
     * |---+---|
     * | P | 5 |
     * |---+---|
     */
    const gridWidth = 2;
    const gd = [
      { index: 0, payload: { enemy: {} }, type: pathType },
      { index: 1, payload: {}, type: pathType },
      { index: 2, payload: {}, type: pathType },
      { index: 3, payload: {}, type: pathType },
      { index: 4, payload: { player: {} }, type: pathType },
      { index: 5, payload: {}, type: pathType },
    ];
    const ep = { index: 0 };
    const pp = { index: 4 };
    const to = gd[2];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should return a function to move enemies three cells north of the player south', () => {
    /*
     *  When gridWidth is 1, horizontal tests
     *  might provide the right answer
     * |---+---|
     * | E | 1 |
     * |===+===|
     * | 2 | 3 |
     * |---+---|
     * | 4 | 5 |
     * |---+---|
     * | P | 7 |
     * |---+---|
     */

    const gridWidth = 2;
    const gd = [
      { index: 0, payload: { enemy: {} }, type: pathType },
      { index: 1, payload: {}, type: pathType },
      { index: 2, payload: {}, type: pathType },
      { index: 3, payload: {}, type: pathType },
      { index: 4, payload: {}, type: pathType },
      { index: 5, payload: {}, type: pathType },
      { index: 6, payload: { player: {} }, type: pathType },
      { index: 7, payload: {}, type: pathType },
    ];
    const ep = { index: 0 };
    const pp = { index: 6 };
    const to = gd[2];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should return a function to move enemies two cells south of the player north', () => {
    /* 
     * |---+---|
     * | P | 1 |
     * |===+===|
     * | 2 | 3 |
     * |---+---|
     * | E | 5 |
     * |---+---|
     */
    const gridWidth = 2;
    const gd = [
      { index: 0, payload: { player: {} }, type: pathType },
      { index: 1, payload: {}, type: pathType },
      { index: 2, payload: {}, type: pathType },
      { index: 3, payload: {}, type: pathType },
      { index: 4, payload: { enemy: {} }, type: pathType },
      { index: 5, payload: {}, type: pathType },
    ];

    const pp = { index: 0 };
    const ep = { index: 4 };
    const to = gd[2];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should return a function to move enemies three cells south of the player north', () => {
    /*
     *|---+---|
     *| P | 1 |
     *|===+===|
     *| 2 | 3 |
     *|---+---|
     *| 4 | 5 |
     *|---+---|
     *| E | 7 |
     *|---+---|
     */
    const gridWidth = 2;
    const gd = [
      { index: 0, payload: { player: {} }, type: pathType },
      { index: 1, payload: {}, type: pathType },
      { index: 2, payload: {}, type: pathType },
      { index: 3, payload: {}, type: pathType },
      { index: 4, payload: {}, type: pathType },
      { index: 5, payload: {}, type: pathType },
      { index: 6, payload: { enemy: {} }, type: pathType },
      { index: 7, payload: {}, type: pathType },
    ];
    const pp = { index: 0 };
    const ep = { index: 6 };
    const to = gd[4];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  // DIAGONALS
  it('should return a function to move northeast enemies west, if there is no obstacle', () => {
    /*
     * |---+---|
     * | 0 | E |
     * |===+===|
     * | P | 3 |
     * |---+---|
     */
    const gridWidth = 2;
    const gd = [
      { index: 0, payload: {}, type: pathType },
      { index: 1, payload: { enemy: {} }, type: pathType },
      { index: 2, payload: { player: {} }, type: pathType },
      { index: 3, payload: {}, type: pathType },
    ];
    const pp = { index: 2 };
    const ep = { index: 1 };
    const to = gd[0];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should return a function to move northwest enemies east, if there is no obstacle', () => {
    /* 
     * Again, need to expand grid to avoid crossover passing
     * |---+---+---|
     * | 0 | E | 2 |
     * |===+===+===|
     * | 3 | 4 | P |
     * |---+---+---|
     */

    const gridWidth = 3;
    const gd = [
      { index: 0, payload: {}, type: pathType },
      { index: 1, payload: { enemy: {} }, type: pathType },
      { index: 2, payload: {}, type: pathType },
      { index: 3, payload: {}, type: pathType },
      { index: 4, payload: {}, type: pathType },
      { index: 5, payload: { player: {} }, type: pathType },
    ];
    const pp = { index: 5 };
    const ep = { index: 1 };
    const to = gd[2];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should return a function to move southeast enemies west, if there is no obstacle', () => {
    /* 
     * |---+---+---|
     * | 0 | P | 2 |
     * |===+===+===|
     * | 3 | 4 | E |
     * |---+---+---|
     */
    const gridWidth = 3;
    const gd = [
      { index: 0, payload: {}, type: pathType },
      { index: 1, payload: { player: {} }, type: pathType },
      { index: 2, payload: {}, type: pathType },
      { index: 3, payload: {}, type: pathType },
      { index: 4, payload: {}, type: pathType },
      { index: 5, payload: { enemy: {} }, type: pathType },
    ];
    const pp = { index: 1 };
    const ep = { index: 5 };
    const to = gd[4];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  it('should return a function to move southwest enemies east, if there is no obstacle', () => {
    // This is a bit longer to avoid a horizontal function picking it up (NOTE: subtracting indices causes row overlap problems!)
    // TODO: Change all of these functions to use coordinates instead?
    /*
 * |---+---+---+---+----+----|
 * | 0 | 1 | P | 3 | 4  | 5  |
 * |===+===+===+===+====+====|
 * | 6 | E | 8 | 9 | 10 | 11 |
 * |---+---+---+---+----+----|
 */
    const gridWidth = 6;
    const gd = [
      { index: 0, payload: {}, type: pathType },
      { index: 1, payload: {}, type: pathType },
      { index: 2, payload: { player: {} }, type: pathType },
      { index: 3, payload: {}, type: pathType },
      { index: 4, payload: {}, type: pathType },
      { index: 5, payload: {}, type: pathType },
      { index: 6, payload: {}, type: pathType },
      { index: 7, payload: { enemy: {} }, type: pathType },
      { index: 8, payload: {}, type: pathType },
      { index: 9, payload: {}, type: pathType },
      { index: 10, payload: {}, type: pathType },
      { index: 11, payload: {}, type: pathType },
    ];
    const pp = { index: 2 };
    const ep = { index: 7 };
    const to = gd[8];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  // FAR DIAGONALS
  /*
  * |-----+-----+----+-----+-----|
  * | 0   | NNW | 2  | NNE | 4   |
  * |=====+=====+====+=====+=====|
  * | WNW | 6   | 7  | 8   | ENE |
  * |-----+-----+----+-----+-----|
  * | 10  | 11  | P  | 13  | 14  |
  * |-----+-----+----+-----+-----|
  * | WSW | 16  | 17 | 18  | ESE |
  * |-----+-----+----+-----+-----|
  * | 20  | SSW | 22 | SSE | 24  |
  * |-----+-----+----+-----+-----|
  */

  // NNW
  it('should return a function to move north-northwest enemies east, if there is no obstacle', () => {
    /*
     * |---+---+---|
     * | 0 | E | 2 |
     * |===+===+===|
     * | 3 | 4 | 5 |
     * |---+---+---|
     * | 6 | 7 | P |
     * |---+---+---|
     */
    const gridWidth = 3;
    const gd = [
      { index: 0, payload: {}, type: pathType },
      { index: 1, payload: { enemy: {} }, type: pathType },
      { index: 2, payload: {}, type: pathType },
      { index: 3, payload: {}, type: pathType },
      { index: 4, payload: {}, type: pathType },
      { index: 5, payload: {}, type: pathType },
      { index: 6, payload: {}, type: pathType },
      { index: 7, payload: {}, type: pathType },
      { index: 8, payload: { player: {} }, type: pathType },
    ];
    const pp = { index: 8 };
    const ep = { index: 1 };
    const to = gd[2];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  // NNE
  it('should return a function to move north-northeast enemies west, if there is no obstacle', () => {
    /*
     * |---+---+---|
     * | 0 | E | 2 |
     * |===+===+===|
     * | 3 | 4 | 5 |
     * |---+---+---|
     * | P | 7 | 8 |
     * |---+---+---|
     */
    const gridWidth = 3;
    const gd = [
      { index: 0, payload: {}, type: pathType },
      { index: 1, payload: { enemy: {} }, type: pathType },
      { index: 2, payload: {}, type: pathType },
      { index: 3, payload: {}, type: pathType },
      { index: 4, payload: {}, type: pathType },
      { index: 5, payload: {}, type: pathType },
      { index: 6, payload: { player: {} }, type: pathType },
      { index: 7, payload: {}, type: pathType },
      { index: 8, payload: {}, type: pathType },
    ];
    const pp = { index: 6 };
    const ep = { index: 1 };
    const to = gd[0];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  // WNW
  it('should return a function to move west-northwest enemies east, if there is no obstacle', () => {
    /*
     * |---+---+---+---|
     * | 0 | E | 2 | 3 |
     * |===+===+===+===|
     * | 4 | 5 | 6 | P |
     * |---+---+---+---|
    */
    const gridWidth = 4;
    const gd = [
      { index: 0, payload: {}, type: pathType },
      { index: 1, payload: { enemy: {} }, type: pathType },
      { index: 2, payload: {}, type: pathType },
      { index: 3, payload: {}, type: pathType },
      { index: 4, payload: {}, type: pathType },
      { index: 5, payload: {}, type: pathType },
      { index: 6, payload: {}, type: pathType },
      { index: 7, payload: { player: {} }, type: pathType },
    ];
    const pp = { index: 7 };
    const ep = { index: 1 };
    const to = gd[2];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  // ENE
  it('should return a function to move east-northeast enemies west, if there is no obstacle', () => {
    /*    
     * |---+---+---+---+---+----+------|
     * | 0 | 1 | 2 | E  | 4  | 5  | 6  |
     * |===+===+===+===+===+====+======|
     * | 7 | P | 9 | 10 | 11 | 12 | 13 |
     * |---+---+---+---+---+----+------|
     */
    const gridWidth = 7;
    const gd = [
      { index: 0, payload: {}, type: pathType },
      { index: 1, payload: {}, type: pathType },
      { index: 2, payload: {}, type: pathType },
      { index: 3, payload: { enemy: {} }, type: pathType },
      { index: 4, payload: {}, type: pathType },
      { index: 5, payload: {}, type: pathType },
      { index: 6, payload: {}, type: pathType },
      { index: 7, payload: {}, type: pathType },
      { index: 8, payload: { player: {} }, type: pathType },
      { index: 9, payload: {}, type: pathType },
      { index: 10, payload: {}, type: pathType },
      { index: 11, payload: {}, type: pathType },
      { index: 12, payload: {}, type: pathType },
      { index: 13, payload: {}, type: pathType },
    ];
    const pp = { index: 8 };
    const ep = { index: 3 };
    const to = gd[2];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  // WSW
  it('should return a function to move west-southwest enemies east, if there is no obstacle', () => {
    /*    
     * |---+---+---+---+---+----+------|
     * | 0 | 1 | 2 | P  | 4  | 5  | 6  |
     * |===+===+===+===+===+====+======|
     * | 7 | E | 9 | 10 | 11 | 12 | 13 |
     * |---+---+---+---+---+----+------|
     */
    const gridWidth = 7;
    const gd = [
      { index: 0, payload: {}, type: pathType },
      { index: 1, payload: {}, type: pathType },
      { index: 2, payload: {}, type: pathType },
      { index: 3, payload: { player: {} }, type: pathType },
      { index: 4, payload: {}, type: pathType },
      { index: 5, payload: {}, type: pathType },
      { index: 6, payload: {}, type: pathType },
      { index: 7, payload: {}, type: pathType },
      { index: 8, payload: { enemy: {} }, type: pathType },
      { index: 9, payload: {}, type: pathType },
      { index: 10, payload: {}, type: pathType },
      { index: 11, payload: {}, type: pathType },
      { index: 12, payload: {}, type: pathType },
      { index: 13, payload: {}, type: pathType },
    ];
    const pp = { index: 3 };
    const ep = { index: 8 };
    const to = gd[9];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  // ESE
  it('should return a function to move east-southeast enemies west, if there is no obstacle', () => {
    /*    
     * |---+---+---+---+---+----+-----|
     * | 0 | 1 | 2 | P  | 4  | 5 | 6  |
     * |===+===+===+===+===+====+=====|
     * | 7 | 8 | 9 | 10 | 11 | E | 13 |
     * |---+---+---+---+---+----+-----|
     */
    const gridWidth = 7;
    const gd = [
      { index: 0, payload: {}, type: pathType },
      { index: 1, payload: {}, type: pathType },
      { index: 2, payload: {}, type: pathType },
      { index: 3, payload: { player: {} }, type: pathType },
      { index: 4, payload: {}, type: pathType },
      { index: 5, payload: {}, type: pathType },
      { index: 6, payload: {}, type: pathType },
      { index: 7, payload: {}, type: pathType },
      { index: 8, payload: {}, type: pathType },
      { index: 9, payload: {}, type: pathType },
      { index: 10, payload: {}, type: pathType },
      { index: 11, payload: {}, type: pathType },
      { index: 12, payload: { enemy: {} }, type: pathType },
      { index: 13, payload: {}, type: pathType },
    ];
    const pp = { index: 3 };
    const ep = { index: 12 };
    const to = gd[11];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  // SSW
  it('should return a function to move south-southwest enemies east, if there is no obstacle', () => {
    /* 
     * |---+---+----+----|
     * | 0 | P | 2  | 3  |
     * |===+===+====+====|
     * | 4 | 5 | 6  | 7  |
     * |---+---+----+----|
     * | E | 9 | 10 | 11 |
     * |---+---+----+----|
     */
    const gridWidth = 4;
    const gd = [
      { index: 0, payload: {}, type: pathType },
      { index: 1, payload: { player: {} }, type: pathType },
      { index: 2, payload: {}, type: pathType },
      { index: 3, payload: {}, type: pathType },
      { index: 4, payload: {}, type: pathType },
      { index: 5, payload: {}, type: pathType },
      { index: 6, payload: {}, type: pathType },
      { index: 7, payload: {}, type: pathType },
      { index: 8, payload: { enemy: {} }, type: pathType },
      { index: 9, payload: {}, type: pathType },
      { index: 10, payload: {}, type: pathType },
      { index: 11, payload: {}, type: pathType },
    ];
    const pp = { index: 1 };
    const ep = { index: 8 };
    const to = gd[9];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  // SSE
  it('should return a function to move south-southeast enemies west, if there is no obstacle', () => {
    /*
     * |---+---+----+---|
     * | 0 | P | 2 | 3  |
     * |===+===+====+===|
     * | 4 | 5 | 6 | 7  |
     * |---+---+----+---|
     * | 8 | 9 | E | 11 |
     * |---+---+----+---|
     */
    const gridWidth = 4;
    const gd = [
      { index: 0, payload: {}, type: pathType },
      { index: 1, payload: { player: {} }, type: pathType },
      { index: 2, payload: {}, type: pathType },
      { index: 3, payload: {}, type: pathType },
      { index: 4, payload: {}, type: pathType },
      { index: 5, payload: {}, type: pathType },
      { index: 6, payload: {}, type: pathType },
      { index: 7, payload: {}, type: pathType },
      { index: 8, payload: {}, type: pathType },
      { index: 9, payload: {}, type: pathType },
      { index: 10, payload: { enemy: {} }, type: pathType },
      { index: 11, payload: {}, type: pathType },
    ];
    const pp = { index: 1 };
    const ep = { index: 10 };
    const to = gd[9];
    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation, gridWidth, level);
    expect(moveEnemy).toHaveBeenCalledWith(ep, to);
  });

  // OBSTACLES
  //  it('should handle obstacles...');

  //  it('should return `undefined` when enemies are in cells out of range', () => {
  //    const gd = [
  //      { index: 0, payload: { player: {} }, type: pathType },
  //      { index: 1, payload: {}, type: pathType },
  //      { index: 2, payload: {}, type: pathType },
  //      { index: 3, payload: {}, type: pathType },
  //      { index: 4, payload: { enemy: {} }, type: pathType },
  //    ];
  //    const pp = { index: 0 };
  //    const ep = { index: 4 };
  //    expect(e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation,gridWidth,level)).toBeUndefined();
  //  });

  //  it('should not call `moveEnemy` when enemies are in cells out of range', () => {
  //    const gd = [
  //      { index: 0, payload: { player: {} }, type: pathType },
  //      { index: 1, payload: {}, type: pathType },
  //      { index: 2, payload: {}, type: pathType },
  //      { index: 3, payload: {}, type: pathType },
  //      { index: 4, payload: { enemy: {} }, type: pathType },
  //    ];
  //    const pp = { index: 0 };
  //    const ep = { index: 4 };
  //    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation,gridWidth,level);
  //    expect(moveEnemy).not.toHaveBeenCalled();
  //  });

  //  it('should call `clearAnimation` after a delay if `moveEnemy` has been called');

  //  it('should not call `clearAnimation` when enemies are in cells out of range', () => {
  // TODO: Specify timeout
  //    const gd = [
  //      { index: 0, payload: { player: {} }, type: pathType },
  //      { index: 1, payload: {}, type: pathType },
  //      { index: 2, payload: {}, type: pathType },
  //      { index: 3, payload: {}, type: pathType },
  //      { index: 4, payload: { enemy: {} }, type: pathType },
  //    ];
  //    const pp = { index: 0 };
  //    const ep = { index: 4 };
  //    e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation,gridWidth,level);
  //    expect(clearAnimation).not.toHaveBeenCalled();
  //  });

  //  it('should return `undefined` if `enemyPosition` has no enemy payload', () => {
  //    const gd = [
  //      { index: 0, payload: { player: {} }, type: pathType },
  //      { index: 1, payload: {}, type: pathType },
  //      { index: 2, payload: {}, type: pathType },
  //    ];
  //    const pp = { index: 0 };
  //    const ep = { index: 2 };
  //    expect(e.checkMove(pp, ep, gd, health, moveEnemy, clearAnimation,gridWidth,level)).toBeUndefined();
  //  });
});

describe('`Enemy` component', () => {
  const initialState = {
    animation: { enemy: { 0: 'attack' } },
    grid: {
      data: [],
      level: 0,
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
