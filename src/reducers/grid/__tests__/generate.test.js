import * as generate from '../generate';

describe('`makeGrid` generate grid reducer function', () => {
  it('should create an array `grid` of objects, each with a property `coordinates` that corresponds to an x/y grid position, an array `index` position, a `payload` that is an empty object, and a `type`', () => {
    const height = 2;
    const width = 2;
    const type = 'vines';
    const grid = [];
    const obj0 = { coordinates: { x: 0, y: 0 }, index: 0, payload: {}, type: 'vines' };
    const obj1 = { coordinates: { x: 1, y: 0 }, index: 1, payload: {}, type: 'vines' };
    const obj2 = { coordinates: { x: 0, y: 1 }, index: 2, payload: {}, type: 'vines' };
    const obj3 = { coordinates: { x: 1, y: 1 }, index: 3, payload: {}, type: 'vines' };

    const createdGrid = [obj0, obj1, obj2, obj3];
    expect(generate.makeGrid(height, width, type, grid)).toEqual(createdGrid);
  });
});

describe('`makeSeed` generate grid reducer function', () => {
  it('should return an object with x/y coordinates appropriate to given bounds', () => {
    const height = 5;
    const width = 5;
    const range = [1, 2];

    /***
     *  Sample Grid
     *  |-----+-----+-----+-----+-----|
     *  | 0,0 | 1,0 | 2,0 | 3,0 | 4,0 |
     *  |=====+=====+=====+=====+=====|
     *  | 0,1 | 1,1 | 2,1 | 3,1 | 4,1 |
     *  |-----+-----+-----+-----+-----|
     *  | 0,2 | 1,2 | 2,2 | 3,2 | 4,2 |
     *  |-----+-----+-----+-----+-----|
     *  | 0,3 | 1,3 | 2,3 | 3,3 | 4,3 |
     *  |-----+-----+-----+-----+-----|
     *  | 0,4 | 1,4 | 2,4 | 3,4 | 4,4 |
     *  |-----+-----+-----+-----+-----|
     ***/

    // If gridWidth is 5 and max size is 2, valid x values are 1, 2
    // x: gridWidth - max - 1 (5 - 2 = 3, but that would leave part of the room on an edge, so -1 => 2)
    expect(generate.makeSeed(height, width, range).x).toBeGreaterThanOrEqual(1);
    expect(generate.makeSeed(height, width, range).x).toBeLessThanOrEqual(2);
    // y is calculated following the same logic with gridHeight
    expect(generate.makeSeed(height, width, range).y).toBeGreaterThanOrEqual(1);
    expect(generate.makeSeed(height, width, range).y).toBeLessThanOrEqual(2);
  });

  /*** No tests for height/width because we assume lodash _.random() works ***/

  it('should throw an error if the range is invalid', () => {
    const height = 5;
    const width = 4;
    const range = [1, 3];

    // max range value must be <= the smaller of height/width - 2.
    // For example, the max room dimension in a 5 x 5 grid is 3.
    // The max room dimension in a 5 x 4 grid is 2.
    // Note that toThrow requires a tested function with arguments to be wrapped in an anonymous function.
    expect(() => generate.makeSeed(height, width, range)).toThrow();
  });
});

describe('`placeCells` generate grid reducer function', () => {
  it('should modify the type of each grid cell that meets coordinate/height/width specs', () => {
    //     const seed = { coordinates: { x: 0, y: 0 }, index: 0, payload: {}, type: 'other' };
    //
    //     const seededGrid = [seed, obj1, obj2, obj3];
    //     expect(generate.placeCells(grid, seed, seededGrid));
  });
});

describe('`isValidRoomPlacement` generate grid reducer function', () => {
  it(
    'should return true if the placement would leave one cell margin around the grid edges and not overlap or be adjacent to other cells with the indicated type'
  );
  it('should return false if the room would extend from the top or to the bottom of the grid');
  it('should return false if the room would extend from the left or to the right of the grid');
  it('should return false if the room would overlap other cells of the same type');
});

// describe('`createRoomsFromSeed` generate grid reducer function');

describe('`doorFinder` generate grid reducer function', () => {
  it(
    'should return a random set of coordinates within the range of cells that are adjacent to and between two rooms with given starting coordinates and extensions'
  );
});

describe('`north` generate grid reducer function', () => {
  it(
    'should generate random coordinates and extension for a group of cells, all with y coordinates more than one less than those of the seed room, and with at least one column sharing an x coordinate with the seed room, and one cell on that column having a y value of exactly one less than the top of the seed room'
  );
});

// describe('`south` generate grid reducer function');
// describe('`east` generate grid reducer function');
// describe('`west` generate grid reducer function');
// describe('`repeatFunc` generate grid reducer function');
// describe('`growMap` generate grid reducer function');
// describe('`addHorizontalDoors` generate grid reducer function');
// describe('`addVerticalDoors` generate grid reducer function');
