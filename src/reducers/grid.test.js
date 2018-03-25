import grid from './grid';
import { GRID_WIDTH, TOTAL_CELLS } from '../constants/settings';

describe('grid reducer', () => {
  /*** TOGGLE_CELL ***/
  it('should toggle the state indicating the player character', () => {
    const initialState = [{ alive: false }, { alive: true }];
    const result = [{ alive: true }, { alive: false }];
    expect(grid(initialState, { type: 'TOGGLE_CELL', index: 0 })).toEqual(result);
  });

  /*** MOVE_EAST ***/
  it('should advance the alive property one index if not at boundary', () => {
    const initialState = [{ alive: true }, { alive: false }];
    const result = [{ alive: false }, { alive: true }];
    expect(grid(initialState, { type: 'MOVE_EAST', position: 0 })).toEqual(result);
  });

  /*** MOVE_NORTH ***/
  it('should move the alive property back GRID_WIDTH indices if not at boundary', () => {
    // manual mocks
    // last index is alive
    const initialState = [];
    for (let i = 0; i < TOTAL_CELLS - 1; i++) {
      initialState.push({ alive: false });
    }
    initialState.push({ alive: true });

    // end of second to last row is alive
    const result = [];
    for (let i = 0; i < TOTAL_CELLS - GRID_WIDTH - 1; i++) {
      result.push({ alive: false });
    }
    result.push({ alive: true });
    for (let i = 0; i < GRID_WIDTH; i++) {
      result.push({ alive: false });
    }
    expect(grid(initialState, { type: 'MOVE_NORTH', position: TOTAL_CELLS - 1 })).toEqual(result);
    expect(grid(initialState, { type: 'MOVE_NORTH', position: 0 })).toEqual(initialState);
  });

  /*** MOVE_SOUTH ***/
  it('should advance the alive property GRID_WIDTH indices if not at boundary', () => {
    //manual mock

    // end of second to last row is alive
    const initialState = [];
    for (let i = 0; i < TOTAL_CELLS - GRID_WIDTH - 1; i++) {
      initialState.push({ alive: false });
    }
    initialState.push({ alive: true });
    for (let i = 0; i < GRID_WIDTH; i++) {
      initialState.push({ alive: false });
    }
    // last index is alive
    const result = [];
    for (let i = 0; i < TOTAL_CELLS - 1; i++) {
      result.push({ alive: false });
    }
    result.push({ alive: true });

    expect(
      grid(initialState, { type: 'MOVE_SOUTH', position: TOTAL_CELLS - GRID_WIDTH - 1 })
    ).toEqual(result);
    expect(grid(result, { type: 'MOVE_SOUTH', position: TOTAL_CELLS - 1 })).toEqual(result);
  });

  /*** MOVE_WEST ***/
  it('should move the alive property back one index if not at boundary', () => {
    const initialState = [{ alive: false }, { alive: true }];
    const result = [{ alive: true }, { alive: false }];
    expect(grid(initialState, { type: 'MOVE_WEST', position: 1 })).toEqual(result);
    expect(grid(result, { type: 'MOVE_WEST', position: 0 })).toEqual(result);
  });
});
