import * as generate from '../generate';

const height = 2;
const width = 2;
const type = 'vines';
const grid = [];
const obj0 = { coordinates: { x: 0, y: 0 }, index: 0, payload: {}, type: 'vines' };
const obj1 = { coordinates: { x: 1, y: 0 }, index: 1, payload: {}, type: 'vines' };
const obj2 = { coordinates: { x: 0, y: 1 }, index: 2, payload: {}, type: 'vines' };
const obj3 = { coordinates: { x: 1, y: 1 }, index: 3, payload: {}, type: 'vines' };

describe('`makeGrid` generate grid reducer function', () => {
  it('should create an array `grid` of objects, each with a property `coordinates` that corresponds to an x/y grid position, an array `index` position, a `payload` that is an empty object, and a `type`', () => {
    const createdGrid = [obj0, obj1, obj2, obj3];
    expect(generate.makeGrid(height, width, type, grid)).toEqual(createdGrid);
  });
});

describe('`placeCells` generate grid reducer function', () => {
  it('should place a seed room onto the grid with predetermined upper left x/y coordinates, height, and width, and with a different type from the default', () => {
    const seed = { coordinates: { x: 0, y: 0 }, index: 0, payload: {}, type: 'other' };

    const seededGrid = [seed, obj1, obj2, obj3];
    expect(generate.placeCells(grid, seed, seededGrid));
  });
});

describe('`isValidRoomPlacement` generate grid reducer function', () => {
  it('should return a Boolean....');
});

describe('`createRoomsFromSeed` generate grid reducer function');

describe('`doorFinder` generate grid reducer function');

describe('`north` generate grid reducer function');
describe('`south` generate grid reducer function');
describe('`east` generate grid reducer function');
describe('`west` generate grid reducer function');
describe('`repeatFunc` generate grid reducer function');
describe('`growMap` generate grid reducer function');
describe('`addHorizontalDoors` generate grid reducer function');
describe('`addVerticalDoors` generate grid reducer function');
