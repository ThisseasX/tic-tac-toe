import calculateWinner from '../calculate-winner';

const grids = [
  [[1, 1, 1, 0, 0, 0, 0, 0, 0], 1],
  [[0, 0, 0, 2, 2, 2, 0, 0, 0], 2],
  [[3, 2, 1, 2, 3, 2, 1, 2, 3], 3],
  [[0, 2, 1, 2, 0, 2, 1, 2, 3], undefined],
  [[0, 0, 0, 0, 0, 0, 0, 0, 0], undefined],
];

describe('asd', () => {
  grids.forEach(([grid, expected]) => {
    it(`Grid: ${grid} - Winner: ${expected}`, () => {
      expect(calculateWinner(grid)).toBe(expected);
    });
  });
});
