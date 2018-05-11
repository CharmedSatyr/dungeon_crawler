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

describe('`placeRoom` generate grid reducer function', () => {
  it('should modify the type of each grid cell that meets coordinate/height/width specs', () => {
    const obj0 = { coordinates: { x: 0, y: 0 }, index: 0, payload: {}, type: 'vines' };
    const obj1 = { coordinates: { x: 1, y: 0 }, index: 1, payload: {}, type: 'vines' };
    const obj2 = { coordinates: { x: 0, y: 1 }, index: 2, payload: {}, type: 'vines' };
    const obj3 = { coordinates: { x: 1, y: 1 }, index: 3, payload: {}, type: 'vines' };

    const grid = [obj0, obj1, obj2, obj3];

    const seed = { coordinates: { x: 0, y: 0 }, index: 0, payload: {}, type: 'other' };
    const seededGrid = [seed, obj1, obj2, obj3];
    expect(generate.placeRoom(grid, seed, 'other')).toEqual(seededGrid);
  });
});

describe('`isValidRoomPlacement` generate grid reducer function', () => {
  // A 3x3 grid, where the only valid placement would be a 1x1 room at the center
  const gridHeight = 3;
  const gridWidth = 3;
  const obj = { type: 'other' };
  const grid = [obj, obj, obj, obj, obj, obj, obj, obj, obj];

  it('should return true if the placement would leave one cell margin around the grid edges and not overlap or be adjacent to other cells with the indicated type', () => {
    const testRoom = { x: 1, y: 1, width: 1, height: 1 };
    expect(
      generate.isValidRoomPlacement(grid, testRoom, gridHeight, gridWidth, 'room')
    ).toBeTruthy();
  });

  it('should return false if the room would extend from the top or to the bottom of the grid', () => {
    const testRoom0 = { x: 1, y: 0, width: 1, height: 1 };
    const testRoom1 = { x: 1, y: 2, width: 1, height: 1 };
    const testRoom2 = { x: 1, y: 1, width: 1, height: 2 };
    expect(
      generate.isValidRoomPlacement(grid, testRoom0, gridHeight, gridWidth, 'room')
    ).toBeFalsy();
    expect(
      generate.isValidRoomPlacement(grid, testRoom1, gridHeight, gridWidth, 'room')
    ).toBeFalsy();
    expect(
      generate.isValidRoomPlacement(grid, testRoom2, gridHeight, gridWidth, 'room')
    ).toBeFalsy();
  });

  it('should return false if the room would extend from the left or to the right of the grid', () => {
    const testRoom0 = { x: 0, y: 1, width: 1, height: 1 };
    const testRoom1 = { x: 2, y: 1, width: 1, height: 1 };
    const testRoom2 = { x: 1, y: 1, width: 2, height: 1 };
    expect(
      generate.isValidRoomPlacement(grid, testRoom0, gridHeight, gridWidth, 'room')
    ).toBeFalsy();
    expect(
      generate.isValidRoomPlacement(grid, testRoom1, gridHeight, gridWidth, 'room')
    ).toBeFalsy();
    expect(
      generate.isValidRoomPlacement(grid, testRoom2, gridHeight, gridWidth, 'room')
    ).toBeFalsy();
  });

  it('should return false if the room would overlap other cells of the same type', () => {
    const placedRoom = { coordinates: { x: 1, y: 1 }, type: 'room' };
    const occupiedGrid = [obj, obj, obj, obj, placedRoom, obj, obj, obj, obj];

    // This is an acceptable room placement, but there's already a placedRoom in the occupiedGrid
    const testRoom = { x: 1, y: 1, width: 1, height: 1 };
    expect(
      generate.isValidRoomPlacement(occupiedGrid, testRoom, gridHeight, gridWidth, 'room')
    ).toBeFalsy();
  });
});

// describe('`createRoomsFromSeed` generate grid reducer function');

describe('`doorFinder` generate grid reducer function', () => {
  it('should return a coordinate value within the range of cells that are adjacent to and between two rooms with given starting coordinates and extensions', () => {
    // Arguments are: parentStart, parentExtension, childStart, childExtension
    // Child room has been generated East of Parent room. Determine Y coordinate of Door
    /***
     *  Sample Grid
     *  |-----+-----+-----|
     *  | PAR | DOR | CHI |
     *  |-----+-----+-----|
     *  | PAR | 1,1 | 2,1 |
     *  |-----+-----+-----|
     *  | PAR | 1,2 | 2,2 |
     *  |-----+-----+-----|
     ***/

    // Child room has been generated South of Parent room. Determine X coordinate of Door
    /***
     *  Sample Grid
     *  |-----+-----+-----|
     *  | PAR | PAR | PAR |
     *  |-----+-----+-----|
     *  | DOR | 1,1 | 2,1 |
     *  |-----+-----+-----|
     *  | CHI | 1,2 | 2,2 |
     *  |-----+-----+-----|
     ***/
    expect(generate.doorFinder(0, 3, 0, 1)).toBe(0);

    // Child room has been generated South of Parent room. Determine X coordinate of Door (multiple values possible)
    /***
     *  Sample Grid
     *  |-----+-----+-----|
     *  | PAR | PAR | PAR |
     *  |-----+-----+-----|
     *  | 0,1 | DOR | DOR |
     *  |-----+-----+-----|
     *  | 0,2 | CHI | CHI |
     *  |-----+-----+-----|
     ***/

    // Child room has been generated East of Parent room. Determine Y coordinate of Door (multiple values possible)
    /***
     *  Sample Grid
     *  |-----+-----+-----|
     *  | PAR | 0,1 | 2,1 |
     *  |-----+-----+-----|
     *  | PAR | DOR | CHI |
     *  |-----+-----+-----|
     *  | PAR | DOR | CHI |
     *  |-----+-----+-----|
     ***/
    expect(generate.doorFinder(0, 3, 1, 2)).toBeGreaterThanOrEqual(1);
    expect(generate.doorFinder(0, 3, 1, 2)).toBeLessThanOrEqual(2);
  });

  it('should throw an error if no door placement is possible', () => {
    // Hopefully this Child will not be generated offset from the Parent
    /***
     *  Sample Grid
     *  |-----+-----+-----|
     *  | PAR | PAR | 2,0 |
     *  |=====+=====+=====|
     *  | 0,1 | 1,1 | 2,1 | // No door placement possible
     *  |-----+-----+-----|
     *  | 0,2 | 1,2 | CHI |
     *  |-----+-----+-----|
     ***/
    /***
     *  Sample Grid
     *  |-----+-----+-----|
     *  | PAR | 1,0 | 2,0 |
     *  |=====+=====+=====|
     *  | PAR | 1,1 | 2,1 |
     *  |-----+-----+-----|
     *  | 0,2 | 1,2 | CHI |
     *  |-----+-----+-----|
     *          ???
     ***/
    expect(() => generate.doorFinder(0, 2, 2, 1)).toThrow();
  });
});

describe('`north` generate grid reducer function', () => {
  it('should generate specs for a child room above the parent but connected by one cell', () => {
    // Keep in mind that this will only generate a room; it will NOT ensure that the room sticks to the containing grid's boundaries

    /***
     *  Sample Grid
     *  |-----+-----+-----|
     *  | 0,0 | CHI | 2,0 |
     *  |=====+=====+=====|
     *  | 0,1 | DOR | 2,1 |
     *  |-----+-----+-----|
     *  | 0,2 | PAR | 2,2 |
     *  |-----+-----+-----|
     ***/
    const seed = [1, 2, 1, 1];
    const range = [1, 1];
    const child = { x: 1, y: 0, height: 1, width: 1, door: { x: 1, y: 1 } };
    expect(generate.north(...seed, range)).toEqual(child);

    // However, at was a boring example, so we can test some basic ranges with a more interesting example.
    /***
     *  Sample Grid
     *  |-----+-----+-----+-----+-----|
     *  | CHI | CHI | CHI | 3,0 | 4,0 | The child room could be 1x1 at [1,1]
     *  |=====+=====+=====+=====+=====|
     *  | CHI | CHI | CHI | 3,1 | 4,1 | However, it could also be 2x2 and start at [0,0] or [1,0]
     *  |-----+-----+-----+-----+-----|
     *  | 0,2 | DOR | 2,2 | 3,2 | 4,2 |
     *  |-----+-----+-----+-----+-----|
     *  | 0,3 | PAR | 2,3 | 3,3 | 4,3 |
     *  |-----+-----+-----+-----+-----|
     *  | 0,4 | 1,4 | 2,4 | 3,4 | 4,4 |
     *  |-----+-----+-----+-----+-----|
     ***/
    const seed2 = [1, 3, 1, 1];
    const range2 = [1, 2];
    expect(generate.north(...seed2, range2).x.toString()).toMatch(/[0-1]/);
    expect(generate.north(...seed2, range2).y.toString()).toMatch(/[0,1]/);
    expect(generate.north(...seed2, range2).height.toString()).toMatch(/[1-2]/);
    expect(generate.north(...seed2, range2).width.toString()).toMatch(/[1-2]/);
    expect(generate.north(...seed2, range2).door).toEqual({ x: 1, y: 2 });
  });
});

// describe('`south` generate grid reducer function');
// describe('`east` generate grid reducer function');
// describe('`west` generate grid reducer function');
// describe('`repeatFunc` generate grid reducer function');
// describe('`growMap` generate grid reducer function');
// describe('`addHorizontalDoors` generate grid reducer function');
// describe('`addVerticalDoors` generate grid reducer function');
