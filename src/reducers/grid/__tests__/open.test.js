import open from '../open';

describe('`open` grid reducer function', () => {
  it('should change a portal `open` property from `false` to `true`', () => {
    const targetObj = {
      payload: {
        portal: {
          open: false
        }
      }
    };
    const data = [targetObj];
    const newObj = {
      payload: {
        portal: {
          open: true
        }
      }
    };
    const newData = [newObj];

    expect(open(data, targetObj)).toEqual(newData);
  });
});
