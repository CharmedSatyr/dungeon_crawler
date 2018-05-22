import React from 'react';
import { shallow } from 'enzyme';
import Loot from './index';
// l = loot
import * as l from '../../constants/loot';
// lc = Loot component
import * as lc from './index';

describe('`setVariety` Loot component function', () => {
  it('should return `fullBarrel` position if `variety` has a full barrel payload', () => {
    const variety = l.fullBarrel;
    expect(lc.setBGPosition(variety)).toEqual(lc.fullBarrelPosition);
  });

  it('should return `emptyBarrel` position if `variety` has an empty barrel payload', () => {
    const variety = l.emptyBarrel;
    expect(lc.setBGPosition(variety)).toEqual(lc.emptyBarrelPosition);
  });

  it('should return a `spear` position if `variety` has a spear payload', () => {
    const variety = { item: l.weapons.spear };
    expect(lc.setBGPosition(variety)).toEqual(lc.spearPosition);
  });

  it('should return a `dragonSpear` position if `variety` has a dragon spear payload', () => {
    const variety = { item: l.weapons.dragonSpear };
    expect(lc.setBGPosition(variety)).toEqual(lc.dragonSpearPosition);
  });

  it('should return a `warningSquare` position in any other case', () => {
    const variety = 'oops!';
    expect(lc.setBGPosition(variety)).toEqual(lc.warningSquarePosition);
  });
});

describe('`Loot` component', () => {
  it('should render without crashing', () => {
    const loot = shallow(<Loot variety={l.emptyBarrel} />);
    expect(loot).toHaveLength(1);
  });
});
