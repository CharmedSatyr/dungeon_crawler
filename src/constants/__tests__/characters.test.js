import * as ch from '../characters';

// direction
// Returns a random cardinal direction
const cardinalDirections = /[north||south||east||west]/;

/*** direction ***/
describe('`direction` populate grid reducer function', () => {
  it('should return a string matching a cardinal direction', () => {
    expect(ch.direction()).toMatch(cardinalDirections);
  });
});
