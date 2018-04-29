describe('`player` reducer', () => {
  it(
    'should add an action.amount of experience to state.experience when an `ADD_XP` action is received'
  );
  it(
    'should raise the player state.level by 1 and the player state.health.max by a calculated amount when a `LEVEL_UP` action is received'
  );
  it('should heal the player for an action.amount of points when a `DRINK` action is received');
  it('should subtract action.damage health from state.health.current, with 0 as the floor');
});
