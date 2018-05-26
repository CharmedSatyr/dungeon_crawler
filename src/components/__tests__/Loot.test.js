import React from 'react';
import { shallow } from 'enzyme';
import Loot from '../Loot';
// l = loot
import * as l from '../../constants/loot';
// lc = Loot component
import * as lc from '../Loot';

describe('`setVariety` Loot component function', () => {
  // Barrels
  it('should return `fullBarrel` position if `variety` has a full barrel payload', () => {
    const variety = l.fullBarrel;
    expect(lc.setBGPosition(variety)).toEqual(lc.fullBarrelPosition);
  });

  it('should return `emptyBarrel` position if `variety` has an empty barrel payload', () => {
    const variety = l.emptyBarrel;
    expect(lc.setBGPosition(variety)).toEqual(lc.emptyBarrelPosition);
  });

  // Gold
  it('should return `goldCoinPosition` if `variety` has a gold coin payload', () => {
    const variety = l.gold.coin;
    expect(lc.setBGPosition(variety)).toEqual(lc.goldCoinPosition);
  });
  it('should return `goldHandfulPosition` if `variety` has a gold handful payload', () => {
    const variety = l.gold.handful;
    expect(lc.setBGPosition(variety)).toEqual(lc.goldHandfulPosition);
  });
  it('should return `goldNuggetPosition` if `variety` has a gold nugget payload', () => {
    const variety = l.gold.nugget;
    expect(lc.setBGPosition(variety)).toEqual(lc.goldNuggetPosition);
  });
  it('should return `goldSmPilePosition` if `variety` has a gold small pile payload', () => {
    const variety = l.gold.sm_pile;
    expect(lc.setBGPosition(variety)).toEqual(lc.goldSmPilePosition);
  });
  it('should return `goldPilePosition` if `variety` has a gold pile payload', () => {
    const variety = l.gold.pile;
    expect(lc.setBGPosition(variety)).toEqual(lc.goldPilePosition);
  });
  it('should return `goldPouchPosition` if `variety` has a gold pouch payload', () => {
    const variety = l.gold.pouch;
    expect(lc.setBGPosition(variety)).toEqual(lc.goldPouchPosition);
  });
  it('should return `goldStashPosition` if `variety` has a gold stash payload', () => {
    const variety = l.gold.stash;
    expect(lc.setBGPosition(variety)).toEqual(lc.goldStashPosition);
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
