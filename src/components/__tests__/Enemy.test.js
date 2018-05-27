import React from 'react';
import Enemy from '../Enemy';
import * as e from '../Enemy';
import * as l from '../../constants/loot';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';

describe('`faceDirection` Enemy component function', () => {
  it('should return a value used to calculate `backgroundPosition`', () => {
    expect(e.faceDirection('north')).toBe(-4);
    expect(e.faceDirection('west')).toBe(-5);
    expect(e.faceDirection('south')).toBe(-6);
    expect(e.faceDirection('east')).toBe(-7);
    expect(e.faceDirection(null)).toBe(-6);
  });
});

describe('`setBackgroundPosition` Enemy component function', () => {
  it('should return a CSS background position', () => {
    expect(e.setBackgroundPosition(null, null, null)).toMatch(/\d+[px]? \d+[px]?/);
  });
});

describe('`setBackgroundImage` Enemy component function', () => {
  it('should be defined for `orc` type', () => {
    expect(e.setBackgroundImage('orc')).toBeDefined();
  });

  it('should be defined for `boss` type', () => {
    expect(e.setBackgroundImage('boss')).toBeDefined();
  });

  it('should be undefined for `kitty` type', () => {
    expect(e.setBackgroundImage('kitty')).toBeUndefined();
  });
});

/*** THIS IS COPIED FROM PLAYERCONTAINER TESTS. NO CHANGES BUT ARGUMENT NAME ***/
describe('`setAnimationClass` Enemy component function', () => {
  it('should return an empty string if `enemyAnimation` is empty', () => {
    expect(e.setAnimationClass(null, null, 'south')).toBe('');
    expect(e.setAnimationClass(null, '', 'test')).toBe('');
  });

  it('should return a className based on the `weapon`, `enemyAnimation`, and `facing` arguments if `enemyAnimation` is `attack`', () => {
    expect(e.setAnimationClass(l.weapons.fists.name, 'attack', 'east')).toBe('slash-attack-east');
    expect(e.setAnimationClass(l.weapons.dagger.name, 'attack', 'west')).toBe('slash-attack-west');
    expect(e.setAnimationClass(l.weapons.spear.name, 'attack', 'south')).toBe(
      'thrust-attack-south'
    );
  });

  it('should return a className based on the `enemyAnimation` and `facing` arguments if `enemyAnimation` is `move`', () => {
    expect(e.setAnimationClass(null, 'move', 'east')).toBe('move-east');
  });
});

// describe('Enemy component', () => {
//   const props = { facing: '', stats: { health: 10 } };
//   const enemy = shallow(<Enemy {...props} />);
//   it('should render without crashing', () => {
//     expect(enemy).toHaveLength(1);
//   });
// });

describe('`Enemy` component', () => {
  const initialState = {
    animation: { enemy: '' },
  };
  const props = {
    stats: { health: 10, weapon: l.weapons.spear },
    facing: 'south',
  };

  const mockStore = configureMockStore();
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should render without crashing', () => {
    // Requires full mount to include store since PlayerContainer
    // is a connected component. Shallow mount won't work
    const player = mount(<Enemy store={store} {...props} />);
    expect(player.find(Enemy)).toHaveLength(1);
  });
});
