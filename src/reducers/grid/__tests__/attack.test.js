import attack from '../attack';

describe('`attack` reducer function', () => {
  it('should reduce enemy `targetObj` health by `damage`', () => {
    const targetObj = {
      index: 0,
      payload: {
        enemy: {
          health: 10
        }
      }
    };
    const data = [targetObj];
    const damage = 3;
    const newObj = {
      index: 0,
      payload: {
        enemy: {
          health: 7
        }
      }
    };
    const newData = [newObj];
    expect(attack(data, targetObj, damage)).toEqual(newData);
  });
});
