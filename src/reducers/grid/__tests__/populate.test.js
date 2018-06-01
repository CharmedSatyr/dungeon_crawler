import * as p from '../populate';
import populate from '../populate';
import * as l from '../../../constants/loot';

const defaultType = 'default';
const pathType = 'path';
const cardinalDirections = /[north||south||east||west]/;

const mockOrc = {
  facing: expect.stringMatching(cardinalDirections),
  health: expect.any(Number),
  level: expect.any(Number),
  weapon: expect.any(Object),
  type: 'orc',
};

const mockBoss = {
  facing: 'west',
  health: expect.any(Number),
  level: expect.any(Number),
  weapon: expect.any(Object),
  type: 'boss',
};

/*** direction ***/
describe('`direction` populate grid reducer function', () => {
  it('should return a string matching a cardinal direction', () => {
    expect(p.direction()).toMatch(cardinalDirections);
  });
});

/*** addEnemies ***/
describe('`addEnemies` populate grid reducer function', () => {
  const pathType = 'floor';
  const data = [{ payload: {}, type: pathType }];

  it('should return an array', () => {
    const probability = 0;
    expect(Array.isArray(p.addEnemies(data, pathType, probability))).toBeTruthy();
  });

  it('should give data objects an `enemy` orc payload if `probability` is 1', () => {
    const updatedData = [{ payload: { enemy: mockOrc }, type: pathType }];
    expect(p.addEnemies(data, pathType, 1)).toEqual(updatedData);
  });

  it('should return the data argument if `probability` is 0', () => {
    expect(p.addEnemies(data, pathType, 0)).toEqual(data);
  });

  it('should not modify objects that already have payloads', () => {
    const hasPayload = [{ payload: { thingy: 1 }, type: pathType }];
    expect(p.addEnemies(hasPayload, pathType, 1)).toEqual(hasPayload);
  });
});

/*** addBoss ***/
describe('`addBoss` populate grid reducer function', () => {
  const data = [{ payload: {}, type: pathType }, { payload: {}, type: pathType }];
  const level = 3;
  const result = p.addBoss(data, pathType, level);

  it('should return an array', () => {
    expect(Array.isArray(result)).toBeTruthy();
  });

  it('should give the second to last data object with type: pathType a `boss` payload if `level` is 3', () => {
    const updatedData = [
      { payload: { enemy: expect.objectContaining(mockBoss) }, type: pathType },
      { payload: {}, type: pathType },
    ];
    expect(result).toEqual(updatedData);
  });

  it('should not modify objects that already have payloads', () => {
    const hasPayload = [
      { payload: { thingy: 1 }, type: pathType },
      { payload: { thingy: 1 }, type: pathType },
    ];
    expect(p.addBoss(hasPayload, pathType, level)).toEqual(hasPayload);
  });

  it('should not do anything if the level is 2 or less', () => {
    expect(p.addBoss(data, pathType, 2)).toEqual(data);
  });
});

/*** addPrinceFew ***/
describe('`addPrinceFew` populate grid reducer function', () => {
  const data = [{ payload: {}, type: pathType }, { payload: {}, type: pathType }];
  const level = 3;
  const result = p.addPrinceFew(data, pathType, level);

  it('should return an array', () => {
    expect(Array.isArray(result)).toBeTruthy();
  });

  it('should give the last data object with type: pathType a `prince` payload if `level` is 3', () => {
    const prince = {
      facing: 'west',
      health: expect.any(Number),
      level: expect.any(Number),
      weapon: expect.any(Object),
      type: 'prince',
    };
    const updatedData = [
      { payload: {}, type: pathType },
      { payload: { prince: expect.objectContaining(prince) }, type: pathType },
    ];
    expect(result).toEqual(updatedData);
  });

  it('should not modify objects that already have payloads', () => {
    const hasPayload = [
      { payload: { thingy: 1 }, type: pathType },
      { payload: { thingy: 1 }, type: pathType },
    ];
    expect(p.addPrinceFew(hasPayload, pathType, level)).toEqual(hasPayload);
  });

  it('should not do anything if the level is 2 or less', () => {
    expect(p.addPrinceFew(data, pathType, 2)).toEqual(data);
  });
});

/*** clearTheDoor ***/
describe('`clearTheDoor` populate grid reducer function', () => {
  /*
   * SAMPLE GRID
   * |-----+-----+-----+-----+-----|
   * |  0  |  1  |  2  |  3  |  4  |
   * |-----+-----+-----+-----+-----|
   * |  5  |  6  | PTH | PTH |  9  |
   * |-----+-----+-----+-----+-----|
   * | PTH | PTH | PTH | PTH |  14 |
   * |-----+-----+-----+-----+-----|
   * |  15 |  16 |  17 | PTH |  19 |
   * |-----+-----+-----+-----+-----|
   * |  20 |  21 |  22 | PTH |  24 |
   * |-----+-----+-----+-----+-----|
   * Loot can go on 7, 8
   * It can't go on 11, 12, 13, 18
   * 10 & 23 are only there to give 11 & 18 paths on either side
   */

  const data = [
    { index: 0, type: defaultType },
    { index: 1, type: defaultType },
    { index: 2, type: defaultType },
    { index: 3, type: defaultType },
    { index: 4, type: defaultType },
    { index: 5, type: defaultType },
    { index: 6, type: defaultType },
    { index: 7, type: pathType },
    { index: 8, type: pathType },
    { index: 9, type: defaultType },
    { index: 10, type: pathType },
    { index: 11, type: pathType },
    { index: 12, type: pathType },
    { index: 13, type: pathType },
    { index: 14, type: defaultType },
    { index: 15, type: defaultType },
    { index: 16, type: defaultType },
    { index: 17, type: defaultType },
    { index: 18, type: pathType },
    { index: 19, type: defaultType },
    { index: 20, type: defaultType },
    { index: 21, type: defaultType },
    { index: 22, type: defaultType },
    { index: 23, type: pathType },
    { index: 24, type: defaultType },
  ];

  const gridWidth = 5;
  it('should return a Boolean', () => {
    for (let i; i < data.length; i++) {
      expect(typeof p.clearTheDoor(data, i, gridWidth, pathType) === Boolean).toBeTruthy();
    }
  });

  it('should return true on a path away from a doorway', () => {
    expect(p.clearTheDoor(data, 7, gridWidth, pathType)).toBeTruthy();
    expect(p.clearTheDoor(data, 8, gridWidth, pathType)).toBeTruthy();
  });

  it('should return false on a path in or beside a doorway', () => {
    [11, 12, 13, 18].forEach(i => expect(p.clearTheDoor(data, i, gridWidth, pathType)).toBeFalsy());
  });
});

/*** setLootType ***/
describe('`setLootType` populate grid reducer function', () => {
  // Barrel
  it('should return a full barrel payload if the argument is < 0.50', () => {
    const { fullBarrel } = l;
    expect(p.setLootType(0)).toMatchObject(fullBarrel);
    expect(p.setLootType(0.49)).toMatchObject(fullBarrel);
  });

  // Gold
  it('should return some type of gold if the argument is >= 0.50 < 0.70', () => {
    const gold = { name: expect.any(String), amount: expect.any(Number) };
    expect(p.setLootType(0.5)).toMatchObject(gold);
    expect(p.setLootType(0.69)).toMatchObject(gold);
  });

  it('should return a gold `coin` if the argument is >= 0.50 < 0.55', () => {
    const gold = l.gold.coin;
    expect(p.setLootType(0.5)).toMatchObject(gold);
    expect(p.setLootType(0.54)).toMatchObject(gold);
  });

  it('should return a gold `handful` if the argument is >= 0.55 < 0.60', () => {
    const gold = l.gold.handful;
    expect(p.setLootType(0.55)).toMatchObject(gold);
    expect(p.setLootType(0.59)).toMatchObject(gold);
  });

  it('should return a gold `nugget` if the argument is >= 0.60 < 0.625', () => {
    const gold = l.gold.nugget;
    expect(p.setLootType(0.6)).toMatchObject(gold);
    expect(p.setLootType(0.624)).toMatchObject(gold);
  });

  it('should return a gold `sm_pile` if the argument is >= 0.625 < 0.65', () => {
    const gold = l.gold.sm_pile;
    expect(p.setLootType(0.625)).toMatchObject(gold);
    expect(p.setLootType(0.64)).toMatchObject(gold);
  });

  it('should return a gold `pile` if the argument is >= 0.65 < 0.675', () => {
    const gold = l.gold.pile;
    expect(p.setLootType(0.65)).toMatchObject(gold);
    expect(p.setLootType(0.674)).toMatchObject(gold);
  });

  it('should return a gold `pouch` if the argument is >= 0.675 < 0.69', () => {
    const gold = l.gold.pouch;
    expect(p.setLootType(0.675)).toMatchObject(gold);
    expect(p.setLootType(0.68)).toMatchObject(gold);
  });

  it('should return a gold `stash` if the argument is >= 0.69 < 0.70', () => {
    const gold = l.gold.stash;
    expect(p.setLootType(0.69)).toMatchObject(gold);
    expect(p.setLootType(0.699)).toMatchObject(gold);
  });

  // Weapons
  it('should return a spear payload if the argument is >= 0.70 < 0.90', () => {
    const spear = { item: l.weapons.spear };
    expect(p.setLootType(0.7)).toMatchObject(spear);
    expect(p.setLootType(0.89)).toMatchObject(spear);
  });

  it('should return a Dragon Spear payload if the argument is >= 0.90', () => {
    const dragonSpear = { item: l.weapons.dragonSpear };
    expect(p.setLootType(0.9)).toMatchObject(dragonSpear);
    expect(p.setLootType(1)).toMatchObject(dragonSpear);
  });
});

/*** addLoot ***/
describe('`addLoot` populate grid reducer function', () => {
  const data = [{ payload: {}, type: pathType }];
  const gridWidth = 5;
  const result = p.addLoot(data, gridWidth, pathType, Math.random());

  it('should return an array', () => {
    expect(Array.isArray(result)).toBeTruthy();
  });

  it('should give data objects a `loot` payload if `probability` is 1', () => {
    expect(p.addLoot(data, gridWidth, pathType, 1)[0].payload).toHaveProperty('loot');
  });

  it('should return the data argument if `probability` is 0', () => {
    expect(p.addLoot(data, gridWidth, pathType, 0)).toEqual(data);
  });

  it('should not modify objects that already have payloads', () => {
    const hasPayload = [{ payload: { thingy: 1 }, type: pathType }];
    expect(p.addLoot(hasPayload, gridWidth, pathType, 1)).toEqual(hasPayload);
  });
});

/*** addPortal ***/
describe('`addPortal` populate grid reducer function', () => {
  const data = [{ payload: {}, type: pathType }, { payload: {}, type: pathType }];
  let level = 1;
  const result = p.addPortal(data, pathType, level);

  it('should return an array', () => {
    expect(Array.isArray(result)).toBeTruthy();
  });

  it('should give the second to last data object with type: pathType a `portal` payload if `level` is < 3', () => {
    const portal = { open: false };
    const updatedData = [{ payload: { portal }, type: pathType }, { payload: {}, type: pathType }];
    expect(result).toEqual(updatedData);
  });

  it('should not modify objects that already have payloads', () => {
    const hasPayload = [
      { payload: { thingy: 1 }, type: pathType },
      { payload: { thingy: 1 }, type: pathType },
    ];
    expect(p.addPortal(hasPayload, pathType, level)).toEqual(hasPayload);
  });

  it('should not do anything if the level is 3 or higher', () => {
    expect(p.addPortal(data, pathType, 3)).toEqual(data);
  });
});

/*** addPortalGuards ***/
describe('`addPortalGuards` populate grid reducer function', () => {
  it('should do nothing if the level has no portal', () => {
    const data = [{ coordinates: { x: 0, y: 0 }, index: 0, payload: {}, type: pathType }];
    expect(p.addPortalGuards(data, pathType, 1)).toEqual(data);
  });

  /* For the below,
  * Index 4 should be Portal
  * Indices 1, 3, 5, 7 should be Enemies
  * |-----+-----+-----|
  * | 0,0 | ENE | 2,0 |
  * |=====+=====+=====|
  * | ENE | DOR | ENE |
  * |-----+-----+-----|
  * | 0,2 | ENE | 2,2 |
  * |-----+-----+-----|
  */

  const gridWidth = 3;
  const data = [
    { coordinates: { x: 0, y: 0 }, index: 0, payload: {}, type: pathType },
    { coordinates: { x: 1, y: 0 }, index: 1, payload: {}, type: pathType },
    { coordinates: { x: 2, y: 0 }, index: 2, payload: {}, type: pathType },
    { coordinates: { x: 0, y: 1 }, index: 3, payload: {}, type: pathType },
    { coordinates: { x: 1, y: 1 }, index: 4, payload: { portal: { open: false } }, type: pathType },
    { coordinates: { x: 2, y: 1 }, index: 5, payload: {}, type: pathType },
    { coordinates: { x: 0, y: 2 }, index: 6, payload: {}, type: pathType },
    { coordinates: { x: 1, y: 2 }, index: 7, payload: {}, type: defaultType }, // Should not be changed
    { coordinates: { x: 2, y: 2 }, index: 8, payload: {}, type: pathType },
  ];

  it('should return an array', () => {
    const probability = 0;
    expect(Array.isArray(p.addPortalGuards(data, pathType, probability, gridWidth))).toBeTruthy();
  });

  it('should add enemies on `pathType` squares adjacent to a portal', () => {
    const probability = 1;
    const updatedData = [
      { coordinates: { x: 0, y: 0 }, index: 0, payload: {}, type: pathType },
      {
        coordinates: { x: 1, y: 0 },
        index: 1,
        payload: { enemy: expect.objectContaining(mockOrc) },
        type: pathType,
      },
      { coordinates: { x: 2, y: 0 }, index: 2, payload: {}, type: pathType },
      {
        coordinates: { x: 0, y: 1 },
        index: 3,
        payload: { enemy: expect.objectContaining(mockOrc) },
        type: pathType,
      },
      {
        coordinates: { x: 1, y: 1 },
        index: 4,
        payload: { portal: { open: false } },
        type: pathType,
      },
      {
        coordinates: { x: 2, y: 1 },
        index: 5,
        payload: { enemy: expect.objectContaining(mockOrc) },
        type: pathType,
      },
      { coordinates: { x: 0, y: 2 }, index: 6, payload: {}, type: pathType },
      { coordinates: { x: 1, y: 2 }, index: 7, payload: {}, type: defaultType },
      { coordinates: { x: 2, y: 2 }, index: 8, payload: {}, type: pathType },
    ];
    expect(p.addPortalGuards(data, pathType, probability, gridWidth)).toEqual(updatedData);
  });
});

/*** addPlayer ***/
describe('`addPlayer` populate grid reducer function', () => {
  const data = [
    { coordinates: { x: 0, y: 0 }, index: 0, payload: {}, type: pathType },
    { coordinates: { x: 1, y: 0 }, index: 1, payload: {}, type: pathType },
  ];

  const result = p.addPlayer(data, pathType);

  it('should return an object with `data` and `playerPosition` properties', () => {
    expect(result).toMatchObject({
      data: expect.any(Object),
      playerPosition: {
        coordinates: {
          x: expect.any(Number),
          y: expect.any(Number),
        },
        index: expect.any(Number),
      },
    });
  });

  it('should give the second data object with type: pathType a `player` payload and return the coordinates and index of the object as playerPosition', () => {
    const player = {
      facing: expect.stringMatching('south'),
      level: expect.any(Number),
      health: expect.any(Number),
    };

    const updatedData = [
      { coordinates: { x: 0, y: 0 }, index: 0, payload: {}, type: pathType },
      { coordinates: { x: 1, y: 0 }, index: 1, payload: { player }, type: pathType },
    ];

    expect(result.data).toEqual(updatedData);
  });

  it('should return the coordinates and index of the object with the `player` payload', () => {
    const expectedPosition = {
      coordinates: {
        x: 1,
        y: 0,
      },
      index: 1,
    };
    expect(result.playerPosition).toEqual(expectedPosition);
  });
  it('should not modify objects that already have payloads', () => {
    const hasPayload = [
      { coordinates: { x: 0, y: 0 }, index: 0, payload: {}, type: pathType },
      { coordinates: { x: 1, y: 0 }, index: 1, payload: { thingy: 1 }, type: pathType },
    ];
    expect(p.addPlayer(hasPayload, pathType).data).toEqual(hasPayload);
  });
});

/*** populate ***/
describe('`populate` grid reducer function', () => {
  /*
   * |-----+-----+-----+-----+-----+-----|
   * | 0,0 | 1,0 | 2,0 | 3,0 | 4,0 | 5,0 |
   * |=====+=====+=====+=====+=====+=====|
   * | 0,1 | 1,1 | 2,1 | 3,1 | 4,1 | 5,1 |
   * |-----+-----+-----+-----+-----+-----|
   * | 0,2 | 1,2 | 2,2 | 3,2 | 4,2 | 5,2 |
   * |-----+-----+-----+-----+-----+-----|
   * | 0,3 | 1,3 | 2,3 | 3,3 | 4,3 | 5,3 |
   * |-----+-----+-----+-----+-----+-----|
   * | 0,4 | 1,4 | 2,4 | 3,4 | 4,4 | 5,4 |
   * |-----+-----+-----+-----+-----+-----|
   * | 0,5 | 1,5 | 2,5 | 3,5 | 4,5 | 5,5 |
   * |-----+-----+-----+-----+-----+-----|
   */

  const data = [
    { coordinates: { x: 0, y: 0 }, index: 0, payload: {}, type: pathType },
    { coordinates: { x: 1, y: 0 }, index: 1, payload: {}, type: pathType },
    { coordinates: { x: 2, y: 0 }, index: 2, payload: {}, type: pathType },
    { coordinates: { x: 3, y: 0 }, index: 3, payload: {}, type: pathType },
    { coordinates: { x: 4, y: 0 }, index: 4, payload: {}, type: pathType },
    { coordinates: { x: 5, y: 0 }, index: 5, payload: {}, type: pathType },
    { coordinates: { x: 0, y: 1 }, index: 6, payload: {}, type: pathType },
    { coordinates: { x: 1, y: 1 }, index: 7, payload: {}, type: pathType },
    { coordinates: { x: 2, y: 1 }, index: 8, payload: {}, type: pathType },
    { coordinates: { x: 3, y: 1 }, index: 9, payload: {}, type: pathType },
    { coordinates: { x: 4, y: 1 }, index: 10, payload: {}, type: pathType },
    { coordinates: { x: 5, y: 1 }, index: 11, payload: {}, type: pathType },
    { coordinates: { x: 0, y: 2 }, index: 12, payload: {}, type: pathType },
    { coordinates: { x: 1, y: 2 }, index: 13, payload: {}, type: pathType },
    { coordinates: { x: 2, y: 2 }, index: 14, payload: {}, type: pathType },
    { coordinates: { x: 3, y: 2 }, index: 15, payload: {}, type: pathType },
    { coordinates: { x: 4, y: 2 }, index: 16, payload: {}, type: pathType },
    { coordinates: { x: 5, y: 2 }, index: 17, payload: {}, type: pathType },
    { coordinates: { x: 0, y: 3 }, index: 18, payload: {}, type: pathType },
    { coordinates: { x: 1, y: 3 }, index: 19, payload: {}, type: pathType },
    { coordinates: { x: 2, y: 3 }, index: 20, payload: {}, type: pathType },
    { coordinates: { x: 3, y: 3 }, index: 21, payload: {}, type: pathType },
    { coordinates: { x: 4, y: 3 }, index: 22, payload: {}, type: pathType },
    { coordinates: { x: 5, y: 3 }, index: 23, payload: {}, type: pathType },
    { coordinates: { x: 0, y: 4 }, index: 24, payload: {}, type: pathType },
    { coordinates: { x: 1, y: 4 }, index: 25, payload: {}, type: pathType },
    { coordinates: { x: 2, y: 4 }, index: 26, payload: {}, type: pathType },
    { coordinates: { x: 3, y: 4 }, index: 27, payload: {}, type: pathType },
    { coordinates: { x: 4, y: 4 }, index: 28, payload: {}, type: pathType },
    { coordinates: { x: 5, y: 4 }, index: 29, payload: {}, type: pathType },
    { coordinates: { x: 0, y: 5 }, index: 30, payload: {}, type: pathType },
    { coordinates: { x: 1, y: 5 }, index: 31, payload: {}, type: pathType },
    { coordinates: { x: 2, y: 5 }, index: 32, payload: {}, type: pathType },
    { coordinates: { x: 3, y: 5 }, index: 33, payload: {}, type: pathType },
    { coordinates: { x: 4, y: 5 }, index: 34, payload: {}, type: pathType },
    { coordinates: { x: 5, y: 5 }, index: 35, payload: {}, type: pathType },
  ];
  // parameters are `data`, `level`, `gridWidth`, `pathType`
  const result = populate(data, 1, 6, pathType);
  it('should return an object with `data` and `playerPosition` properties', () => {
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('playerPosition');
  });

  it('should return `playerPosition` coordinates and index', () => {
    const playerPosition = {
      coordinates: {
        x: expect.any(Number),
        y: expect.any(Number),
      },
      index: expect.any(Number),
    };

    expect(result.playerPosition).toMatchObject(playerPosition);
  });

  it('should return `data` array that includes an object with a `player` payload,', () => {
    const playerObj = {
      coordinates: { x: expect.any(Number), y: expect.any(Number) },
      index: expect.any(Number),
      payload: { player: expect.any(Object) },
      type: pathType,
    };
    expect(result.data).toContainEqual(playerObj);
  });

  it('should return `data` array that includes an object with a `portal` payload if the level is < 3', () => {
    const portalObj = {
      coordinates: { x: expect.any(Number), y: expect.any(Number) },
      index: expect.any(Number),
      payload: { portal: { open: false } },
      type: pathType,
    };
    expect(result.data).toContainEqual(portalObj);
    expect(populate(data, 3, 6, pathType)).not.toContainEqual(portalObj);
  });
  // Loot and Enemies are not guaranteed
});
