import * as ch from '../characters';
import * as l from '../loot';

// direction
// Returns a random cardinal direction
const cardinalDirections = /[north||south||east||west]/;

/*** direction ***/
describe('`direction` character constant function', () => {
  it('should return a string matching a cardinal direction', () => {
    expect(ch.direction()).toMatch(cardinalDirections);
  });
});

/*** addWeapon ***/
describe('`addWeapon` character constant function', () => {
  it('should return a weapon type based on `chances` argument', () => {
    expect(ch.addWeapon(0)).toBe(l.weapons.fists);
    expect(ch.addWeapon(0.49)).toBe(l.weapons.fists);
    expect(ch.addWeapon(0.5)).toBe(l.weapons.dagger);
    expect(ch.addWeapon(0.74)).toBe(l.weapons.dagger);
    expect(ch.addWeapon(0.75)).toBe(l.weapons.spear);
    expect(ch.addWeapon(1)).toBe(l.weapons.spear);
  });
});
