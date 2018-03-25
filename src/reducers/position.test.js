import position from './position';
import { GRID_WIDTH, TOTAL_CELLS } from '../constants/settings';

// ('UPDATE_POSITION');
// ('MOVE_NORTH');
// ('MOVE_EAST');
// ('MOVE_SOUTH');
// ('MOVE_WEST');

describe('positions reducer', () => {
  // Positions calculated with this test are used in other position cases.
  // Position input below is undefined but will be correct if UPDATE_POSITION succeeds
  it('should show current player position index', () => {
    expect(position(undefined, { type: 'UPDATE_POSITION', index: 0 })).toEqual(0);
  });

  it('should move a player up one square if not at a boundary', () => {
    expect(position(0, { type: 'MOVE_NORTH', position: undefined })).toEqual(0);
    expect(position(TOTAL_CELLS, { type: 'MOVE_NORTH', position: undefined })).toEqual(
      TOTAL_CELLS - GRID_WIDTH
    );
  });

  it('should move a player right one square if not at a boundary', () => {
    expect(position(0, { type: 'MOVE_EAST', position: undefined })).toEqual(1);
    expect(position(GRID_WIDTH - 1, { type: 'MOVE_EAST', position: undefined })).toEqual(
      GRID_WIDTH - 1
    );
  });

  it('should move a player down one square if not at a boundary', () => {
    expect(position(0, { type: 'MOVE_SOUTH', position: undefined })).toEqual(0 + GRID_WIDTH);
    expect(position(TOTAL_CELLS, { type: 'MOVE_SOUTH', position: undefined })).toEqual(TOTAL_CELLS);
  });

  it('should move a player left one square if not at a boundary', () => {
    expect(position(0, { type: 'MOVE_WEST', position: undefined })).toEqual(0);
    expect(position(TOTAL_CELLS - 1, { type: 'MOVE_WEST', position: undefined })).toEqual(
      TOTAL_CELLS - 2
    );
  });
});
