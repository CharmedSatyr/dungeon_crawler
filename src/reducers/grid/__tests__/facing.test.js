import facing from '../facing';

describe('`facing` grid reducer function', () => {
  /*** PLAYER ***/
  it('should update the player `facing` value to "east" if the `targetObj` x coordinate is +1 on the same row', () => {
    const playerPosition = { coordinates: { x: 0, y: 0 }, index: 0 };
    const targetObj = { coordinates: { x: 1, y: 0 }, index: 1 };
    const flag = 'player';
    const playerObj = {
      payload: {
        player: {
          facing: 'test'
        }
      }
    };
    const data = [playerObj, targetObj];
    const newPlayerObj = {
      payload: {
        player: {
          facing: 'east'
        }
      }
    };
    const newData = [newPlayerObj, targetObj];
    expect(facing(data, playerPosition, targetObj, flag)).toEqual(newData);
  });
  it('should update the player `facing` value to "west" if the `targetObj` x coordinate is -1 on the same row', () => {
    const targetObj = { coordinates: { x: 0, y: 0 }, index: 0 };
    const playerPosition = { coordinates: { x: 1, y: 0 }, index: 1 };
    const flag = 'player';
    const playerObj = {
      payload: {
        player: {
          facing: 'test'
        }
      }
    };
    const data = [targetObj, playerObj];
    const newPlayerObj = {
      payload: {
        player: {
          facing: 'west'
        }
      }
    };
    const newData = [targetObj, newPlayerObj];
    expect(facing(data, playerPosition, targetObj, flag)).toEqual(newData);
  });
  it('should update the player `facing` value to "north" if the `targetObj` y coordinate is -1 on the same column', () => {
    const targetObj = { coordinates: { x: 0, y: 0 }, index: 0 };
    const playerPosition = { coordinates: { x: 0, y: 1 }, index: 1 };
    const flag = 'player';
    const playerObj = {
      payload: {
        player: {
          facing: 'test'
        }
      }
    };
    const data = [targetObj, playerObj];
    const newPlayerObj = {
      payload: {
        player: {
          facing: 'north'
        }
      }
    };
    const newData = [targetObj, newPlayerObj];
    expect(facing(data, playerPosition, targetObj, flag)).toEqual(newData);
  });

  it('should update the player `facing` value to "south" if the `targetObj` y coordinate is +1 on the same column', () => {
    const playerPosition = { coordinates: { x: 0, y: 0 }, index: 0 };
    const targetObj = { coordinates: { x: 0, y: 1 }, index: 1 };
    const flag = 'player';
    const playerObj = {
      payload: {
        player: {
          facing: 'test'
        }
      }
    };
    const data = [playerObj, targetObj];
    const newPlayerObj = {
      payload: {
        player: {
          facing: 'south'
        }
      }
    };
    const newData = [newPlayerObj, targetObj];
    expect(facing(data, playerPosition, targetObj, flag)).toEqual(newData);
  });

  /*** ENEMY ***/
  // These still use the playerPosition as a reference but will point the targetObj toward the player rather than the player toward the targetObj
  it('should update the enemy `facing` value to "west" if the `targetObj` x coordinate is +1 on the same row', () => {
    const flag = 'enemy';
    const playerPosition = { coordinates: { x: 0, y: 0 }, index: 0 };
    const targetObj = {
      coordinates: { x: 1, y: 0 },
      index: 1,
      payload: {
        enemy: {
          facing: 'test'
        }
      }
    };
    const data = [playerPosition, targetObj];
    const newTargetObj = {
      coordinates: { x: 1, y: 0 },
      index: 1,
      payload: {
        enemy: {
          facing: 'west'
        }
      }
    };
    const newData = [playerPosition, newTargetObj];
    expect(facing(data, playerPosition, targetObj, flag)).toEqual(newData);
  });

  it('should update the enemy `facing` value to "east" if the `targetObj` x coordinate is -1 on the same row', () => {
    const flag = 'enemy';
    const targetObj = {
      coordinates: { x: 0, y: 0 },
      index: 0,
      payload: {
        enemy: {
          facing: 'test'
        }
      }
    };
    const playerPosition = { coordinates: { x: 1, y: 0 }, index: 1 };
    const data = [targetObj, playerPosition];
    const newTargetObj = {
      coordinates: { x: 0, y: 0 },
      index: 0,
      payload: {
        enemy: {
          facing: 'east'
        }
      }
    };
    const newData = [newTargetObj, playerPosition];
    expect(facing(data, playerPosition, targetObj, flag)).toEqual(newData);
  });

  it('should update the enemy `facing` value to "south" if the `targetObj` x coordinate is -1 on the same column', () => {
    const flag = 'enemy';
    const targetObj = {
      coordinates: { x: 0, y: 0 },
      index: 0,
      payload: {
        enemy: {
          facing: 'test'
        }
      }
    };
    const playerPosition = { coordinates: { x: 0, y: 1 }, index: 1 };
    const data = [targetObj, playerPosition];
    const newTargetObj = {
      coordinates: { x: 0, y: 0 },
      index: 0,
      payload: {
        enemy: {
          facing: 'south'
        }
      }
    };
    const newData = [newTargetObj, playerPosition];
    expect(facing(data, playerPosition, targetObj, flag)).toEqual(newData);
  });

  it('should update the enemy `facing` value to "north" if the `targetObj` x coordinate is +1 on the same column', () => {
    const flag = 'enemy';
    const playerPosition = { coordinates: { x: 0, y: 0 }, index: 0 };
    const targetObj = {
      coordinates: { x: 0, y: 1 },
      index: 1,
      payload: {
        enemy: {
          facing: 'test'
        }
      }
    };
    const data = [playerPosition, targetObj];
    const newTargetObj = {
      coordinates: { x: 0, y: 1 },
      index: 1,
      payload: {
        enemy: {
          facing: 'north'
        }
      }
    };
    const newData = [playerPosition, newTargetObj];
    expect(facing(data, playerPosition, targetObj, flag)).toEqual(newData);
  });
});
