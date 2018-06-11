import * as c from '../../constants/settings';
import * as l from '../../constants/loot';
import * as ch from '../../constants/characters';
import * as h from '../../actions/index.helpers';
import tileTypes from '../../constants/tile-types';

/*** Enemy functions ***/
// Add enemies
export const addEnemies = (data, pathType, probability) => {
  for (let i = data.length - 1; i >= 0; i--) {
    // `probability` of an empty path being occupied by an enemy
    if (
      data[i] &&
      data[i].payload &&
      probability >= Math.random() &&
      Object.keys(data[i].payload).length === 0 &&
      data[i].type === pathType
    ) {
      // Orcs are the default enemy
      data[i].payload = { enemy: new ch.orc() };
    }
  }
  return data;
};

export const addBoss = (data, pathType, level) => {
  let count = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    // boss only appears on `level` 3
    if (
      level === 3 &&
      Object.keys(data[i].payload).length === 0 &&
      data[i].type === pathType &&
      count <= 2
    ) {
      count++;
      if (count === 2) {
        data[i].payload = { enemy: ch.boss };
      }
    }
  }
  return data;
};

export const addPortalGuards = (data, pathType, probability, gridWidth = c.GRID_WIDTH) => {
  const portal = data.find(cell => cell.payload.hasOwnProperty('portal'));
  if (portal) {
    const portalAdjacentPositions = h.adjacentPositions(portal, gridWidth);
    const portalAdjacentObjects = portalAdjacentPositions.map(i => data[i.index]);
    const updatedObjs = addEnemies(portalAdjacentObjects, pathType, probability);
    updatedObjs.forEach(uo => {
      if (uo && uo.payload && uo.payload.enemy) {
        data.splice(uo.index, 1, uo);
      }
    });
  }
  return data;
};

export const addPrinceFew = (data, pathType, level) => {
  for (let i = data.length - 1; i >= 0; i--) {
    // Prince Few only appears on `level` 3
    if (level === 3 && Object.keys(data[i].payload).length === 0 && data[i].type === pathType) {
      data[i].payload = { prince: ch.prince };
      break;
    }
  }
  return data;
};

/*** Loot functions ***/
// Don't block a door with loot
export const clearTheDoor = (data, i, gridWidth, pathType) => {
  // No door to the right
  const right = data[i + 1];
  const upRight = data[i + 1 - gridWidth];
  const downRight = data[i + 1 + gridWidth];

  if (
    upRight &&
    right &&
    downRight &&
    upRight.type !== pathType &&
    right.type === pathType &&
    downRight.type !== pathType
  ) {
    return false;
  }

  // No door above
  const up = data[i - gridWidth];
  const upLeft = data[i - 1 - gridWidth];
  if (
    upLeft &&
    up &&
    upRight &&
    upLeft.type !== pathType &&
    up.type === pathType &&
    upRight.type !== pathType
  ) {
    return false;
  }

  // No door left
  const left = data[i - 1];
  const downLeft = data[i - 1 + gridWidth];
  if (
    upLeft &&
    left &&
    downLeft &&
    upLeft.type !== pathType &&
    left.type === pathType &&
    downLeft.type !== pathType
  ) {
    return false;
  }

  // No door below
  const down = data[i + gridWidth];
  if (
    downLeft &&
    down &&
    downRight &&
    downLeft.type !== pathType &&
    down.type === pathType &&
    downRight.type !== pathType
  ) {
    return false;
  }

  // Not in a doorway
  if (
    up &&
    down &&
    left &&
    right &&
    up.type !== pathType &&
    down.type !== pathType &&
    left.type === pathType &&
    right.type === pathType
  ) {
    return false;
  }

  if (
    up &&
    down &&
    left &&
    right &&
    up.type === pathType &&
    down.type === pathType &&
    left.type !== pathType &&
    right.type !== pathType
  ) {
    return false;
  }
  return true;
};

// Set the type of loot in a square
export const setLootType = chances => {
  switch (true) {
    // Barrels
    case chances < 0.5:
      return l.fullBarrel;
    // Gold
    case chances < 0.55:
      return l.gold.coin;
    case chances < 0.6:
      return l.gold.handful;
    case chances < 0.625:
      return l.gold.nugget;
    case chances < 0.65:
      return l.gold.sm_pile;
    case chances < 0.675:
      return l.gold.pile;
    case chances < 0.69:
      return l.gold.pouch;
    case chances < 0.7:
      return l.gold.stash;
    // Weapons
    case chances < 0.8:
      return { item: l.weapons.dagger };
    case chances < 0.9:
      return { item: l.weapons.spear };
    case chances >= 0.9:
      return { item: l.weapons.dragonSpear };
    default:
      return l.fullBarrel;
  }
};

// Add loot
export const addLoot = (data, gridWidth, pathType, probability) => {
  for (let i = 0; i < data.length; i++) {
    const loot = setLootType(Math.random());
    if (
      Object.keys(data[i].payload).length === 0 &&
      data[i].type === pathType &&
      clearTheDoor(data, i, gridWidth, pathType) &&
      probability >= Math.random()
    ) {
      data[i].payload = { loot };
    }
  }
  return data;
};

/*** ADD PORTAL ***/
export const addPortal = (data, pathType, level) => {
  let count = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    // portal
    const portal = { open: false };

    if (Object.keys(data[i].payload).length === 0 && data[i].type === pathType && count <= 2) {
      count++;
      if (count === 2 && level < 3) {
        data[i].payload = { portal };
      }
    }
  }
  return data;
};

/*** ADD PLAYER ***/
// addPlayer
export const addPlayer = (data, pathType) => {
  let count = 0;
  let playerPosition;
  for (let i = 0; i <= data.length - 1; i++) {
    if (Object.keys(data[i].payload).length === 0 && data[i].type === pathType && count <= 2) {
      count++;
      if (count === 2) {
        data[i].payload = { player: ch.player };

        // Save playerPosition as a variable
        playerPosition = {
          coordinates: { x: data[i].coordinates.x, y: data[i].coordinates.y },
          index: i,
        };
      }
    }
  }
  return { data, playerPosition };
};

// Populate the data with payloads (player, enemies, etc.)
const populate = (data, level, gridWidth = c.GRID_WIDTH, pathType = tileTypes(level, 'path')) => {
  // Add enemies
  data = addEnemies(data, pathType, 0.025);

  // Add the boss just west of the southeast corner for level 3
  data = addBoss(data, pathType, level);

  // Add the boss just west of the southeast corner for level 3
  data = addPrinceFew(data, pathType, level);

  // Add loot
  data = addLoot(data, gridWidth, pathType, 0.02);

  // Add portal just west of the southeast corner for levels 1-2
  data = addPortal(data, pathType, level);

  // Add guards around the portals on each level
  data = addPortalGuards(data, pathType, 0.4);

  // Position player just east of the northwest corner
  const p = addPlayer(data, pathType);

  return { data: p.data, playerPosition: p.playerPosition };
};

export default populate;
