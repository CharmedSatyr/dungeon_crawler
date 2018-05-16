import * as g from '../generate';
import generate from '../generate';

// Global values
const defaultType = 'default';
const floorType = 'floor';

describe('`makeGrid` generate grid reducer function', () => {
  it('should return an array of `height` * `width` objects', () => {
    let grid = [];
    let height = 2;
    let width = 2;
    expect(g.makeGrid(grid, height, width, defaultType)).toHaveLength(height * width);

    grid = [];
    height = 10;
    width = 12;
    expect(g.makeGrid(grid, height, width, defaultType)).toHaveLength(height * width);
  });

  it('should create an array `grid` of objects, each with a property `coordinates` that corresponds to an x/y grid position, an `index`, a `payload` that is an empty object, and a `type`', () => {
    const grid = [];
    const height = 2;
    const width = 2;
    const obj0 = { coordinates: { x: 0, y: 0 }, index: 0, payload: {}, type: defaultType };
    const obj1 = { coordinates: { x: 1, y: 0 }, index: 1, payload: {}, type: defaultType };
    const obj2 = { coordinates: { x: 0, y: 1 }, index: 2, payload: {}, type: defaultType };
    const obj3 = { coordinates: { x: 1, y: 1 }, index: 3, payload: {}, type: defaultType };

    const createdGrid = [obj0, obj1, obj2, obj3];
    expect(g.makeGrid(grid, height, width, defaultType)).toEqual(createdGrid);
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
    expect(g.makeSeed(height, width, range).x).toBeGreaterThanOrEqual(1);
    expect(g.makeSeed(height, width, range).x).toBeLessThanOrEqual(2);
    // y is calculated following the same logic with gridHeight
    expect(g.makeSeed(height, width, range).y).toBeGreaterThanOrEqual(1);
    expect(g.makeSeed(height, width, range).y).toBeLessThanOrEqual(2);
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
    expect(() => g.makeSeed(height, width, range)).toThrow();
  });
});

describe('`placeRoom` generate grid reducer function', () => {
  it('should modify the type of each grid cell that meets coordinate/height/width specs', () => {
    const obj0 = { coordinates: { x: 0, y: 0 }, index: 0, payload: {}, type: defaultType };
    const obj1 = { coordinates: { x: 1, y: 0 }, index: 1, payload: {}, type: defaultType };
    const obj2 = { coordinates: { x: 0, y: 1 }, index: 2, payload: {}, type: defaultType };
    const obj3 = { coordinates: { x: 1, y: 1 }, index: 3, payload: {}, type: defaultType };

    const grid = [obj0, obj1, obj2, obj3];

    const seedSpecs = { x: 0, y: 0, height: 1, width: 1 };
    const seedRoom = { coordinates: { x: 0, y: 0 }, index: 0, payload: {}, type: floorType };
    const seededGrid = [seedRoom, obj1, obj2, obj3];
    expect(g.placeRoom(grid, seedSpecs, floorType)).toEqual(seededGrid);
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
    expect(g.isValidRoomPlacement(grid, testRoom, gridHeight, gridWidth, floorType)).toBeTruthy();
  });

  it('should return false if the room would extend from the top or to the bottom of the grid', () => {
    const testRoom0 = { x: 1, y: 0, width: 1, height: 1 };
    const testRoom1 = { x: 1, y: 2, width: 1, height: 1 };
    const testRoom2 = { x: 1, y: 1, width: 1, height: 2 };
    expect(g.isValidRoomPlacement(grid, testRoom0, gridHeight, gridWidth, floorType)).toBeFalsy();
    expect(g.isValidRoomPlacement(grid, testRoom1, gridHeight, gridWidth, floorType)).toBeFalsy();
    expect(g.isValidRoomPlacement(grid, testRoom2, gridHeight, gridWidth, floorType)).toBeFalsy();
  });

  it('should return false if the room would extend from the left or to the right of the grid', () => {
    const testRoom0 = { x: 0, y: 1, width: 1, height: 1 };
    const testRoom1 = { x: 2, y: 1, width: 1, height: 1 };
    const testRoom2 = { x: 1, y: 1, width: 2, height: 1 };
    expect(g.isValidRoomPlacement(grid, testRoom0, gridHeight, gridWidth, floorType)).toBeFalsy();
    expect(g.isValidRoomPlacement(grid, testRoom1, gridHeight, gridWidth, floorType)).toBeFalsy();
    expect(g.isValidRoomPlacement(grid, testRoom2, gridHeight, gridWidth, floorType)).toBeFalsy();
  });

  it('should return false if the room would overlap other cells of the same type', () => {
    const placedRoom = { coordinates: { x: 1, y: 1 }, type: floorType };
    const occupiedGrid = [obj, obj, obj, obj, placedRoom, obj, obj, obj, obj];

    // This is an acceptable room placement, but there's already a placedRoom in the occupiedGrid
    const testRoom = { x: 1, y: 1, width: 1, height: 1 };
    expect(
      g.isValidRoomPlacement(occupiedGrid, testRoom, gridHeight, gridWidth, floorType)
    ).toBeFalsy();
  });
});

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
    expect(g.doorFinder(0, 3, 0, 1)).toBe(0);

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
    expect(g.doorFinder(0, 3, 1, 2).toString()).toMatch(/[1-2]/);
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
    expect(() => g.doorFinder(0, 2, 2, 1)).toThrow();
  });
});

describe('`east` generate grid reducer function', () => {
  // `north` has more complete notes
  it('should generate specs for a child room right of the parent but connected by one cell', () => {
    /***
     *  Sample Grid
     *  |-----+-----+-----+-----+-----|
     *  | 0,0 | 1,0 | 2,0 | 3,0 | 4,0 |
     *  |=====+=====+=====+=====+=====|
     *  | 0,1 | 1,1 | 2,1 | 3,1 | 4,1 |
     *  |-----+-----+-----+-----+-----|
     *  | 0,2 | 1,2 | 2,2 | CHI | CHI |
     *  |-----+-----+-----+-----+-----|
     *  | 0,3 | PAR | DOR | CHI | CHI | The child room could be 1x1 at [3,3]
     *  |-----+-----+-----+-----+-----|
     *  | 0,4 | 1,4 | 2,4 | CHI | CHI | However, it could also be 2x2 and start at [3,2] or [3,3]
     *  |-----+-----+-----+-----+-----|
     ***/
    const seed = [1, 3, 1, 1];
    const range = [1, 2];
    expect(g.east(...seed, range).x).toBe(3);
    expect(g.east(...seed, range).y.toString()).toMatch(/[2,3]/);
    expect(g.east(...seed, range).height.toString()).toMatch(/[1,2]/);
    expect(g.east(...seed, range).width.toString()).toMatch(/[1,2]/);
    expect(g.east(...seed, range).door).toEqual({ x: 2, y: 3, height: 1, width: 1 });
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
    const child = { x: 1, y: 0, height: 1, width: 1, door: { x: 1, y: 1, height: 1, width: 1 } };
    expect(g.north(...seed, range)).toEqual(child);

    // However, that was a boring example, so we can test some basic ranges with a more interesting example.
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
    expect(g.north(...seed2, range2).x.toString()).toMatch(/[0-1]/);
    expect(g.north(...seed2, range2).y.toString()).toMatch(/[0,1]/);
    expect(g.north(...seed2, range2).height.toString()).toMatch(/[1-2]/);
    expect(g.north(...seed2, range2).width.toString()).toMatch(/[1-2]/);
    expect(g.north(...seed2, range2).door).toEqual({ x: 1, y: 2, height: 1, width: 1 });
    // Further tests could make the parent bigger and test additional child placement opportunities,
    // but if this works and doorFinder works, the child should be OK.
  });
});

describe('`south` generate grid reducer function', () => {
  it('should generate specs for a child room below the parent but connected by one cell', () => {
    /***
     *  Sample Grid
     *  |-----+-----+-----+-----+-----|
     *  | 0,0 | 1,0 | 2,0 | 3,0 | 4,0 |
     *  |=====+=====+=====+=====+=====|
     *  | 0,1 | 1,1 | 2,1 | PAR | 4,1 |
     *  |-----+-----+-----+-----+-----|
     *  | 0,2 | 1,2 | 2,2 | DOR | 4,2 |
     *  |-----+-----+-----+-----+-----|
     *  | 0,3 | 1,3 | CHI | CHI | CHI | The child room could be 1x1 at [3,3]
     *  |-----+-----+-----+-----+-----|
     *  | 0,4 | 1,4 | CHI | CHI | CHI | However, it could also be 2x2 and start at [2,3] or [3,3]
     *  |-----+-----+-----+-----+-----|
     ***/
    const seed = [3, 1, 1, 1];
    const range = [1, 2];
    expect(g.south(...seed, range).x.toString()).toMatch(/[2,3]/);
    expect(g.south(...seed, range).y).toBe(3);
    expect(g.south(...seed, range).height.toString()).toMatch(/[1,2]/);
    expect(g.south(...seed, range).width.toString()).toMatch(/[1,2]/);
    expect(g.south(...seed, range).door).toEqual({ x: 3, y: 2, height: 1, width: 1 });
  });
});

describe('`west` generate grid reducer function', () => {
  it('should generate specs for a child room left of the parent but connected by one cell', () => {
    /***
     *  Sample Grid
     *  |-----+-----+-----+-----+-----|
     *  | CHI | CHI | 2,0 | 3,0 | 4,0 |
     *  |=====+=====+=====+=====+=====|
     *  | CHI | CHI | DOR | PAR | 4,1 | The child room could be 1x1 at [1,1]
     *  |-----+-----+-----+-----+-----|
     *  | CHI | CHI | 2,2 | 3,2 | 4,2 | However, it could also be 2x2 and start at [0,0] or [0,1]
     *  |-----+-----+-----+-----+-----|
     *  | 0,3 | 1,3 | 2,3 | 3,3 | 4,3 |
     *  |-----+-----+-----+-----+-----|
     *  | 0,4 | 1,4 | 2,4 | 3,4 | 4,4 |
     *  |-----+-----+-----+-----+-----|
     ***/
    const seed = [3, 1, 1, 1];
    const range = [1, 2];
    expect(g.west(...seed, range).x.toString()).toMatch(/[0,1]/);
    expect(g.west(...seed, range).y.toString()).toMatch(/[0,1]/);
    expect(g.west(...seed, range).height.toString()).toMatch(/[1,2]/);
    expect(g.west(...seed, range).width.toString()).toMatch(/[1,2]/);
    expect(g.west(...seed, range).door).toEqual({ x: 2, y: 1, height: 1, width: 1 });
  });
});

describe('`repeatDirectionalRoomGeneration` generate grid reducer function', () => {
  const num = 5;
  const seedSpecs = [0, 0, 1, 1];
  const range = [1, 2];
  const mockFn = jest.fn();
  const calledFn = g.repeatDirectionalRoomGeneration(num, mockFn, seedSpecs, range);
  it('should call the `func` `num` times', () => {
    expect(mockFn).toHaveBeenCalledTimes(num);
  });
  it('should return an array of length `num`', () => {
    expect(Array.isArray(calledFn)).toBeTruthy();
    expect(calledFn).toHaveLength(num);
  });
  it('the argument `func` should be called using the arguments...', () => {
    const expected = Array(num).fill([...seedSpecs, range]);
    expect(mockFn.mock.calls).toEqual(expected);
  });
});

describe('`createRoomsFromSeed` generate grid reducer function', () => {
  // This function takes a seed room and runs directional room generation helper functions to create an array of possible child rooms in each direction
  // Then, it iterates through the created array. If a child room passes `isValidRoomPlacement`, the function runs `placeRoom` once to place the room and again to place the door (treating the door like a separate room).
  // The function keeps track of an array of rooms that have been placed, for later use.
  // Rather than performing integration tests of the component functions, this test just ensures the right sort of output
  let grid = [
    { coordinates: { x: 0, y: 0 }, type: defaultType },
    { coordinates: { x: 1, y: 0 }, type: defaultType },
    { coordinates: { x: 0, y: 1 }, type: defaultType },
    { coordinates: { x: 1, y: 1 }, type: defaultType },
  ];
  let gridSize = grid.length;
  const seedSpecs = { x: 2, y: 2, height: 1, width: 1 };
  const level = 1;
  const num = 5;
  const roomSideSizeRange = [1, 1];

  it('should return an object that includes a property `grid` that is an array of the same length as the `grid` argument', () => {
    let args = [grid, seedSpecs, level, floorType, num, roomSideSizeRange];
    expect(Array.isArray(g.createRoomsFromSeed(...args).grid)).toBeTruthy();
    expect(g.createRoomsFromSeed(...args).grid).toHaveLength(gridSize);

    grid = [
      { coordinates: { x: 0, y: 0 }, type: defaultType },
      { coordinates: { x: 1, y: 0 }, type: defaultType },
      { coordinates: { x: 0, y: 1 }, type: defaultType },
      { coordinates: { x: 1, y: 1 }, type: defaultType },
      { coordinates: { x: 0, y: 2 }, type: defaultType },
      { coordinates: { x: 1, y: 2 }, type: defaultType },
    ];
    gridSize = grid.length;
    args = [grid, seedSpecs, level, floorType, num, roomSideSizeRange];
    expect(g.createRoomsFromSeed(...args).grid).toHaveLength(gridSize);
  });

  it('should return an object that includes an array `placedRooms`', () => {
    let args = [grid, seedSpecs, level, floorType, num, roomSideSizeRange];
    expect(Array.isArray(g.createRoomsFromSeed(...args).placedRooms)).toBeTruthy();
  });
});

describe('`growMap` generate grid reducer function', () => {
  const level = 1;
  const roomSideSizeRange = [2, 4];
  const maxRooms = 25;
  const seed = { x: 1, y: 1, height: 1, width: 1, door: { x: 3, y: 3 } };
  const lastFourArgs = [level, floorType, roomSideSizeRange, maxRooms];

  it('should return a `grid` array of unmodified length', () => {
    let gridSize = 9;
    let grid = Array(gridSize).fill({ coordinates: { x: 0, y: 0 }, type: defaultType });
    expect(g.growMap(grid, [seed], ...lastFourArgs)).toHaveLength(gridSize);
    gridSize = 90;
    grid = Array(gridSize).fill({ coordinates: { x: 0, y: 0 }, type: defaultType });
    expect(g.growMap(grid, [seed], ...lastFourArgs)).toHaveLength(gridSize);
  });

  it('should place rooms around the seed in every direction and recursively from those rooms', () => {
    /***
     *  Sample Grid
     *  |-----+-----+-----+-----+-----|
     *  | 0,0 | 1,0 | 2,0 | 3,0 | 4,0 |
     *  |=====+=====+=====+=====+=====|
     *  | 0,1 | 1,1 | ROM | 3,1 | 4,1 |
     *  |-----+-----+-----+-----+-----|
     *  | 0,2 | ROM | SED | ROM | 4,2 |
     *  |-----+-----+-----+-----+-----|
     *  | 0,3 | 1,3 | ROM | 3,3 | 4,3 |
     *  |-----+-----+-----+-----+-----|
     *  | 0,4 | 1,4 | DOR | 3,4 | 4,4 |
     *  |-----+-----+-----+-----+-----|
     *  | 0,5 | 1,5 | ROM | 3,5 | 4,5 | // room generated off [2,3]
     *  |-----+-----+-----+-----+-----|
     *  | 0,6 | 1,6 | 2,6 | 3,6 | 4,6 |
     *  |-----+-----+-----+-----+-----|
     ***/
    const seed = { x: 1, y: 1, height: 1, width: 1 };
    const grid = [
      // Row
      { coordinates: { x: 0, y: 0 }, type: defaultType },
      { coordinates: { x: 1, y: 0 }, type: defaultType },
      { coordinates: { x: 2, y: 0 }, type: defaultType },
      { coordinates: { x: 3, y: 0 }, type: defaultType },
      { coordinates: { x: 4, y: 0 }, type: defaultType },
      // Row
      { coordinates: { x: 0, y: 1 }, type: defaultType },
      { coordinates: { x: 1, y: 1 }, type: defaultType },
      { coordinates: { x: 2, y: 1 }, type: defaultType },
      { coordinates: { x: 3, y: 1 }, type: defaultType },
      { coordinates: { x: 4, y: 1 }, type: defaultType },
      // Row
      { coordinates: { x: 0, y: 2 }, type: defaultType },
      { coordinates: { x: 1, y: 2 }, type: defaultType },
      { coordinates: { x: 2, y: 2 }, type: 'floor' }, // It is mysterious that variable floorType can't go here
      { coordinates: { x: 3, y: 2 }, type: defaultType },
      { coordinates: { x: 4, y: 2 }, type: defaultType },
      // Row
      { coordinates: { x: 0, y: 3 }, type: defaultType },
      { coordinates: { x: 1, y: 3 }, type: defaultType },
      { coordinates: { x: 2, y: 3 }, type: defaultType },
      { coordinates: { x: 3, y: 3 }, type: defaultType },
      { coordinates: { x: 4, y: 3 }, type: defaultType },
      // Row
      { coordinates: { x: 0, y: 4 }, type: defaultType },
      { coordinates: { x: 1, y: 4 }, type: defaultType },
      { coordinates: { x: 2, y: 4 }, type: defaultType },
      { coordinates: { x: 3, y: 4 }, type: defaultType },
      { coordinates: { x: 4, y: 4 }, type: defaultType },
      // Row
      { coordinates: { x: 0, y: 5 }, type: defaultType },
      { coordinates: { x: 1, y: 5 }, type: defaultType },
      { coordinates: { x: 2, y: 5 }, type: defaultType },
      { coordinates: { x: 3, y: 5 }, type: defaultType },
      { coordinates: { x: 4, y: 5 }, type: defaultType },
      // Row
      { coordinates: { x: 0, y: 6 }, type: defaultType },
      { coordinates: { x: 1, y: 6 }, type: defaultType },
      { coordinates: { x: 2, y: 6 }, type: defaultType },
      { coordinates: { x: 3, y: 6 }, type: defaultType },
      { coordinates: { x: 4, y: 6 }, type: defaultType },
    ];

    const updatedGrid = grid;
    const floorType = 'dirtPath';
    updatedGrid[7].type = floorType;
    updatedGrid[11].type = floorType;
    updatedGrid[13].type = floorType;
    updatedGrid[17].type = floorType;
    updatedGrid[22].type = floorType;
    updatedGrid[27].type = floorType;

    expect(g.growMap(grid, [seed], ...lastFourArgs)).toEqual(updatedGrid);
  });
});

describe('`addHorizontalDoors` generate grid reducer function', () => {
  /***
   *  Sample Grid
   *  |-----+-----+-----|
   *  | ROM | 1,0 | ROM |
   *  |=====+=====+=====|
   ***/
  /***
   *  Updated Grid
   *  |-----+-----+-----|
   *  | ROM | DOR | ROM |
   *  |=====+=====+=====|
   ***/

  const grid = [
    // Row
    { coordinates: { x: 0, y: 0 }, type: floorType },
    { coordinates: { x: 1, y: 0 }, type: defaultType },
    { coordinates: { x: 2, y: 0 }, type: floorType },
  ];
  const updatedGrid = [
    // Row
    { coordinates: { x: 0, y: 0 }, type: floorType },
    { coordinates: { x: 1, y: 0 }, type: floorType },
    { coordinates: { x: 2, y: 0 }, type: floorType },
  ];

  it('should not modify `grid` cell types if `probability` is `0`', () => {
    expect(g.addHorizontalDoors(grid, 1, 0, defaultType, floorType)).toEqual(grid);
  });
  it('should modify `grid` cell types to connect to close rooms horizontally if `probability` is `1`', () => {
    expect(g.addHorizontalDoors(grid, 1, 1, defaultType, floorType)).toEqual(updatedGrid);
  });
});

describe('`addVerticalDoors` generate grid reducer function', () => {
  /***
   *  Sample Grid
   *  |-----|
   *  | ROM |
   *  |=====|
   *  | 0,1 |
   *  |-----|
   *  | ROM |
   *  |-----|
   ***/
  /***
   *  Updated Grid
   *  |-----|
   *  | ROM |
   *  |=====|
   *  | DOR |
   *  |-----|
   *  | ROM |
   *  |-----|
   ***/
  const grid = [
    // Row
    { coordinates: { x: 0, y: 0 }, type: floorType },
    // Row
    { coordinates: { x: 0, y: 1 }, type: defaultType },
    // Row
    { coordinates: { x: 0, y: 2 }, type: floorType },
  ];
  const updatedGrid = [
    // Row
    { coordinates: { x: 0, y: 0 }, type: floorType },
    // Row
    { coordinates: { x: 0, y: 1 }, type: floorType },
    // Row
    { coordinates: { x: 0, y: 2 }, type: floorType },
  ];

  it('should not modify `grid` cell types if `probability` is `0`', () => {
    expect(g.addVerticalDoors(grid, 1, 0, defaultType, floorType)).toEqual(grid);
  });
  it('should modify `grid` cell types to connect to close rooms vertically if `probability` is `1`', () => {
    expect(g.addVerticalDoors(grid, 1, 1, defaultType, floorType, 1)).toEqual(updatedGrid);
  });
});

describe('`generate` grid reducer function', () => {
  let level = 1,
    grid = [],
    gridHeight = 10,
    gridWidth = 12,
    min = 1,
    max = 3,
    maxRooms = 10;
  let args;
  const setArgs = () => {
    args = [level, grid, gridHeight, gridWidth, defaultType, floorType, [min, max], maxRooms];
  };
  const refreshArgs = () => {
    level = 1;
    grid = [];
    gridHeight = 10;
    gridWidth = 12;
    min = 1;
    max = 3;
    maxRooms = 10;
    setArgs();
  };

  it('should throw an error if `gridHeight` argument is less than 3', () => {
    gridHeight = 1;
    setArgs();
    expect(() => generate(...args)).toThrow();
    refreshArgs();
  });

  it('should throw an error if `gridWidth` argument is less than 3', () => {
    gridWidth = 1;
    setArgs();
    expect(() => generate(...args)).toThrow();
    refreshArgs();
  });

  it('should throw an error if `roomSideSizeRange` `min` is not greater than 0', () => {
    min = 0;
    setArgs();
    expect(() => generate(...args)).toThrow();
    refreshArgs();
  });

  it('should throw an error if `roomSideSizeRange` `max` is not greater than 0', () => {
    max = 0;
    setArgs();
    expect(() => generate(...args)).toThrow();
    refreshArgs();
  });

  it('should return an array of `gridHeight` * `gridWidth` length', () => {
    gridHeight = 5;
    gridWidth = 12;
    setArgs();
    expect(generate(...args)).toHaveLength(gridHeight * gridWidth);
    refreshArgs();

    gridHeight = 30;
    gridWidth = 1111;
    setArgs();
    expect(generate(...args)).toHaveLength(gridHeight * gridWidth);
    refreshArgs();
  });

  it('should return an array containing objects with `coordinates`, `index`, `payload`, and `type` properties with values of the appropriate type, regardless of the level', () => {
    const expected = Array(gridHeight * gridWidth).fill({
      coordinates: expect.objectContaining({ x: expect.any(Number), y: expect.any(Number) }),
      index: expect.any(Number),
      payload: {},
      type: expect.any(String),
    });

    // Tests through level 10
    for (let i = 0; i <= 10; i++) {
      level = i;
      setArgs();
      expect(generate(...args)).toEqual(expect.arrayContaining(expected));
      refreshArgs();
    }
  });
});
