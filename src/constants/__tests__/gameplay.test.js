import * as g from '../gameplay';

describe('damageCalc', () => {
  it('should calculate attack damage based on weapon minimum and maximum damage and payer level', () => {
    const min = 1,
      max = 5;
    // Test max/min values
    expect(g.damageCalc(min, min, 1)).toBe(1);
    expect(g.damageCalc(max, max, 1)).toBe(5);
    expect(g.damageCalc(min, min, 3)).toBe(1.5);
    expect(g.damageCalc(max, max, 3)).toBe(7.5);
    expect(g.damageCalc(min, min, 5)).toBe(2);
    expect(g.damageCalc(max, max, 5)).toBe(10);
    // Test ranges
    expect(g.damageCalc(min, max, 1)).toBeGreaterThanOrEqual(min);
    expect(g.damageCalc(min, max, 1)).toBeLessThanOrEqual(max);
    expect(g.damageCalc(min, max, 3)).toBeGreaterThanOrEqual(1.5);
    expect(g.damageCalc(min, max, 3)).toBeLessThanOrEqual(7.5);
    expect(g.damageCalc(min, max, 5)).toBeGreaterThanOrEqual(2);
    expect(g.damageCalc(min, max, 5)).toBeLessThanOrEqual(10);
  });
});

describe('xpCalc', () => {
  it('should calculate experience per enemy killed', () => {
    expect(g.xpCalc(1)).toBe(10);
    expect(g.xpCalc(5)).toBe(50);
  });
});

describe('healthCalc', () => {
  it('should calculate new max health on level up', () => {
    expect(g.healthCalc(1)).toBe(10);
    expect(g.healthCalc(5)).toBe(50);
  });
});

describe('levelUp', () => {
  it('should return a Boolean for whether current experience allows a player to level up', () => {
    expect(g.levelUp(0, 1)).toBeFalsy();
    expect(g.levelUp(60, 2)).toBeFalsy();
    expect(g.levelUp(80, 5)).toBeFalsy();
    expect(g.levelUp(80, 2)).toBeTruthy();
    expect(g.levelUp(220, 4)).toBeTruthy();
  });
});
