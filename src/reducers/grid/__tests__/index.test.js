// import grid from '../index';
// import * as t from '../../../constants/action-types';
// // import { GRID_WIDTH, TOTAL_CELLS } from '../../../constants/settings';
//
describe('grid reducers', () => {
  it('should perform integration tests for the grid reducer functions');
});
// describe('grid reducers', () => {
//   /*** TOGGLE_CELL ***/
//   it('should toggle the state indicating the player character', () => {
//     const initialState = [{ player: false }, { player: true }];
//     const result = [{ player: true }, { player: false }];
//
//     expect(grid(initialState, { type: 'TOGGLE_CELL', index: 0 })).toEqual(result);
//   });
//
//   /*** MOVE_EAST ***/
//   it('should advance the player property one index if not at boundary', () => {
//     const initialState = [{ player: true }, { player: false }];
//     const result = [{ player: false }, { player: true }];
//
//     expect(grid(initialState, { type: 'MOVE_EAST', position: 0 })).toEqual(result);
//   });
//
//   /*** MOVE_NORTH ***/
//   it('should move the player property back GRID_WIDTH indices if not at boundary', () => {
//     // manual mocks
//     // last index is player
//     const initialState = [];
//     for (let i = 0; i < TOTAL_CELLS; i++) {
//       initialState.push({ player: false });
//     }
//     initialState.splice(TOTAL_CELLS - 1, 1, { player: true });
//
//     // end of second to last row is player
//     const result = [];
//     for (let i = 0; i < TOTAL_CELLS; i++) {
//       result.push({ player: false });
//     }
//     result.splice(TOTAL_CELLS - 1 - GRID_WIDTH, 1, { player: true });
//
//     expect(grid(initialState, { type: 'MOVE_NORTH', position: TOTAL_CELLS - 1 })).toEqual(result);
//     expect(grid(initialState, { type: 'MOVE_NORTH', position: 0 })).toEqual(initialState);
//   });
//
//   /*** MOVE_SOUTH ***/
//   it('should advance the player property GRID_WIDTH indices if not at boundary', () => {
//     //manual mock
//
//     // end of second to last row is player
//     const initialState = [];
//     for (let i = 0; i < TOTAL_CELLS; i++) {
//       initialState.push({ player: false });
//     }
//     initialState.splice(TOTAL_CELLS - 1 - GRID_WIDTH, 1, { player: true });
//
//     // last index is player
//     const result = [];
//     for (let i = 0; i < TOTAL_CELLS; i++) {
//       result.push({ player: false });
//     }
//     result.splice(TOTAL_CELLS - 1, 1, { player: true });
//
//     // first cell on last row
//     const initialState2 = [];
//     for (let i = 0; i < TOTAL_CELLS; i++) {
//       initialState2.push({ player: false });
//     }
//     initialState2.splice(TOTAL_CELLS - GRID_WIDTH, 1, { player: true });
//
//     expect(
//       grid(initialState, { type: 'MOVE_SOUTH', position: TOTAL_CELLS - 1 - GRID_WIDTH })
//     ).toEqual(result);
//     expect(grid(result, { type: 'MOVE_SOUTH', position: TOTAL_CELLS - 1 })).toEqual(result);
//     // Ensure the first cell on the last row cannot move down
//     expect(grid(initialState2, { type: 'MOVE_SOUTH', position: TOTAL_CELLS - GRID_WIDTH })).toEqual(
//       initialState2
//     );
//   });
//
//   /*** MOVE_WEST ***/
//   it('should move the player property back one index if not at boundary', () => {
//     const initialState = [{ player: false }, { player: true }];
//     const result = [{ player: true }, { player: false }];
//
//     expect(grid(initialState, { type: 'MOVE_WEST', position: 1 })).toEqual(result);
//     expect(grid(result, { type: 'MOVE_WEST', position: 0 })).toEqual(result);
//   });
// });
