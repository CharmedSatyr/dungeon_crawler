import * as a from '../index';
import * as g from '../../constants/gameplay';
import * as t from '../../constants/action-types';
import * as l from '../../constants/loot';

/*** SIMPLE ACTION CREATORS ***/
describe('`add_gold` action creator', () => {
  it('should return an action to add gold to the player inventory', () => {
    const amount = 10;
    const targetObj = {};
    const action = { type: t.ADD_GOLD, amount, targetObj };
    expect(a.add_gold(amount, targetObj)).toEqual(action);
  });
});

describe('`add_item` action creator', () => {
  it('should return an action to add an item to the player inventory', () => {
    const item = { testy: 'placeholder' };
    const targetObj = {};
    const action = { type: t.ADD_ITEM, item, targetObj };
    expect(a.add_item(item, targetObj)).toEqual(action);
  });
});

describe('`add_xp` action creator', () => {
  it('should return an action to add experience to the player', () => {
    const args = 56;
    const action = { type: t.ADD_XP, amount: 56 };
    expect(a.add_xp(args)).toEqual(action);
  });
});

describe('`attack` action creator', () => {
  it('should return an action to attack a targetObject a certain amount', () => {
    const targetObj = {};
    const d = 10;
    const action = {
      type: t.ATTACK,
      targetObj,
      damage: d,
    };
    expect(a.attack(targetObj, d)).toMatchObject(action);
  });
});

describe('`change_weapon` action creator', () => {
  it('should return an action to cycle through items in the player inventory', () => {
    const action = {
      type: t.CHANGE_WEAPON,
    };
    expect(a.change_weapon()).toMatchObject(action);
  });
});

describe('`clear_animation` action creator', () => {
  it('should return an action to remove an animated CSS style class', () => {
    const action = {
      type: t.CLEAR_ANIMATION,
    };
    expect(a.clear_animation()).toMatchObject(action);
  });
});

describe('`clear_enemy_animation` action creator', () => {
  it('should return an action to remove an animated CSS style class', () => {
    const action = {
      type: t.CLEAR_ENEMY_ANIMATION,
    };
    expect(a.clear_enemy_animation()).toMatchObject(action);
  });
});

describe('`drink` action creator', () => {
  it('should return an action to drink from a full barrel', () => {
    const targetObj = {
      payload: {
        loot: l.fullBarrel,
      },
    };
    const amount = expect.any(Number);
    const action = {
      type: t.DRINK,
      targetObj,
      amount,
    };
    expect(a.drink(targetObj, amount)).toEqual(action);
  });
});

describe('`facing` action creator', () => {
  it('should return an action containing a type, the argument object, and the provided or `player` flag', () => {
    const enemyObj = {
      coordinates: { x: 0, y: 0 },
      payload: {
        enemy: {
          facing: 'south',
        },
      },
    };
    expect(a.facing(enemyObj, 'enemy')).toMatchObject({
      type: t.FACING,
      targetObj: enemyObj,
      flag: 'enemy',
    });
    const playerObj = {
      coordinates: { x: 0, y: 0 },
      payload: {
        player: {
          facing: 'north',
        },
      },
    };
    expect(a.facing(playerObj)).toMatchObject({
      type: t.FACING,
      targetObj: playerObj,
      flag: 'player',
    });
  });
});

describe('`move` action creator', () => {
  it('should return an action to move to a target position', () => {
    const args = [{ x: 0, y: 0 }];
    const action = {
      type: t.MOVE,
      targetObj: args[0],
    };
    expect(a.move(...args)).toEqual(action);
  });
});

describe('`level_up` action creator', () => {
  it('should return an action to level up the player', () => {
    const action = { type: t.LEVEL_UP };
    expect(a.level_up()).toEqual(action);
  });
});

describe('`message` action creator', () => {
  it('should return an action to display a message', () => {
    const args = 'test!';
    const action = {
      type: t.MESSAGE,
      msg: args,
    };
    expect(a.message(args)).toEqual(action);
  });
});

describe('`next_level` action creator', () => {
  it('should return an action to advance the player to the next game level', () => {
    const action = { type: t.NEXT_LEVEL };
    expect(a.next_level()).toEqual(action);
  });
});

describe('`open` action creator', () => {
  it('should return an action to open a door or other target object', () => {
    const args = [{ x: 0, y: 0 }];
    const action = {
      type: t.OPEN,
      targetObj: args[0],
    };
    expect(a.open(...args)).toEqual(action);
  });
});

describe('`take_damage` action creator', () => {
  it('should return an action to cause the player to take a specified amount of damage', () => {
    const damage = 12;
    const index = 0;
    const action = { damage, index, type: t.TAKE_DAMAGE };
    expect(a.take_damage(damage, index)).toEqual(action);
  });
});

/*** THUNKS ***/
// hostile_enemies
describe('`hostile_enemies` action creator thunk', () => {
  it('should trigger batched `facing`, `message`, and `take_damage` action creators', () => {
    const targetObj = {
      coordinates: {},
      index: expect.any(Number),
      payload: {
        enemy: {
          weapon: {
            min_damage: expect.any(Number),
            max_damage: expect.any(Number),
          },
        },
      },
    };
    const batchAction = {
      payload: [
        { type: t.FACING, targetObj },
        { type: t.MESSAGE, msg: expect.any(String) },
        { type: t.TAKE_DAMAGE, damage: expect.any(Number), index: targetObj.index },
      ],
      type: 'BATCHING_REDUCER.BATCH',
    };
    expect(a.hostile_enemies(targetObj)).toMatchObject(batchAction);
  });
});

// level_check
describe('`level_check` action creator thunk', () => {
  const player = { experience: 0, level: 1 };
  it('should trigger batched `level_up` and `message` action creators if the player should level up', () => {
    const xp = 1000000;
    expect(a.level_check(xp, player)).toMatchObject({
      payload: [{ type: t.LEVEL_UP }, { type: t.MESSAGE }],
      type: 'BATCHING_REDUCER.BATCH',
    });
  });
  it('should return a `null` type action if the player should not level up', () => {
    const xp = 0;
    expect(a.level_check(xp, player)).toMatchObject({
      payload: [{ type: null }],
      type: 'BATCHING_REDUCER.BATCH',
    });
  });
});

// player_input
describe('`player_input` action creator thunk', () => {
  it('should trigger `move` action creator if the argument type is `dirtPath`', () => {
    const pathTargetObj = {
      payload: {},
      type: 'dirtPath',
    };
    expect(a.player_input(pathTargetObj)).toMatchObject({ type: t.MOVE });
  });

  it('should trigger `move` action creator if the argument payload is a dead enemy', () => {
    const enemyDeadTargetObj = {
      payload: {
        enemy: {
          health: -10,
        },
      },
    };
    expect(a.player_input(enemyDeadTargetObj)).toMatchObject({ type: t.MOVE });
  });

  it('should trigger batched `add_item`, `move`, and `message` action creators if the argument payload is an item', () => {
    const itemTargetObj = {
      payload: {
        loot: {
          item: l.weapons.spear,
        },
      },
    };

    expect(a.player_input(itemTargetObj)).toMatchObject({
      payload: [
        { type: t.MOVE },
        { type: t.ADD_ITEM, item: l.weapons.spear, targetObj: itemTargetObj },
        { type: t.MESSAGE },
      ],
      type: 'BATCHING_REDUCER.BATCH',
    });
  });

  it('should trigger batched `add_gold`, `move`, and `message` action creators if the argument payload is gold', () => {
    const targetObj = {
      payload: {
        loot: l.gold.coin,
      },
    };

    expect(a.player_input(targetObj)).toMatchObject({
      payload: [
        { type: t.MOVE },
        { type: t.ADD_GOLD, amount: l.gold.coin.amount, targetObj },
        { type: t.MESSAGE },
      ],
      type: 'BATCHING_REDUCER.BATCH',
    });
  });

  it('should trigger batched `attack`, `message`, and `facing` action creators if the argument payload is a living enemy', () => {
    const enemyAliveTargetObj = {
      payload: {
        enemy: {
          health: 10,
        },
      },
    };
    expect(a.player_input(enemyAliveTargetObj)).toMatchObject({
      payload: [{ type: t.ATTACK }, { type: t.MESSAGE }, { type: t.FACING }],
      type: 'BATCHING_REDUCER.BATCH',
    });
  });

  it('should trigger batched `add_xp`, `attack`, `facing`, `level_check`, and `message` action creators if the enemy dies on attack', () => {
    const enemyWillDieTargetObj = {
      payload: {
        enemy: {
          level: 1,
          health: 10,
        },
      },
    };
    const player = { weapon: { min_damage: 10, max_damage: 10 }, level: 1 };
    expect(a.player_input(enemyWillDieTargetObj, player)).toMatchObject({
      payload: [
        { type: t.ADD_XP, amount: g.xpCalc(enemyWillDieTargetObj.payload.enemy.level) },
        {
          type: t.ATTACK,
          damage: g.damageCalc(player.weapon.min_damage, player.weapon.max_damage, player.level),
        },
        { type: t.FACING },
        { type: 'BATCHING_REDUCER.BATCH' }, // level_check is a thunk
        { type: t.MESSAGE },
      ],
      type: 'BATCHING_REDUCER.BATCH',
    });
  });

  it('should trigger batched `drink`, `message`, and `facing` action creators if the targetObj is a full barrel', () => {
    const waterBarrel = {
      payload: {
        loot: l.fullBarrel,
      },
    };
    expect(a.player_input(waterBarrel)).toMatchObject({
      payload: [{ type: t.DRINK }, { type: t.MESSAGE }, { type: t.FACING }],
      type: 'BATCHING_REDUCER.BATCH',
    });
  });

  it('should trigger batched `message` and `facing` action creators if the targetObj is an empty barrel', () => {
    const emptyBarrel = {
      payload: {
        loot: l.emptyBarrel,
      },
    };
    expect(a.player_input(emptyBarrel)).toMatchObject({
      payload: [{ type: t.MESSAGE }, { type: t.FACING }],
      type: 'BATCHING_REDUCER.BATCH',
    });
  });

  it('should trigger batched `open`, `message`, and `facing` action creators if the targetObj is a closed portal', () => {
    const closedPortal = {
      payload: {
        portal: { open: false },
      },
    };
    expect(a.player_input(closedPortal)).toMatchObject({
      payload: [{ type: t.OPEN }, { type: t.MESSAGE }, { type: t.FACING }],
      type: 'BATCHING_REDUCER.BATCH',
    });
  });

  it('should trigger batched `next_level` and `message` action creators if the targetObj is an open portal', () => {
    const openPortal = {
      payload: {
        portal: { open: true },
      },
    };
    expect(a.player_input(openPortal)).toMatchObject({
      payload: [{ type: t.NEXT_LEVEL }, { type: t.MESSAGE }],
      type: 'BATCHING_REDUCER.BATCH',
    });
  });

  it('should trigger `facing` action creator if argument type is `vines`', () => {
    const barrierTargetObj = {
      payload: {},
      type: 'vines',
    };
    expect(a.player_input(barrierTargetObj)).toMatchObject({ type: t.FACING });
  });
});
