import React from 'react';
import { shallow } from 'enzyme';
import Enemy from '../Enemy';
import * as e from '../Enemy';

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

describe('Enemy component', () => {
  const props = { facing: '', stats: { health: 10 } };
  const enemy = shallow(<Enemy {...props} />);
  it('should render without crashing', () => {
    expect(enemy).toHaveLength(1);
  });
});
