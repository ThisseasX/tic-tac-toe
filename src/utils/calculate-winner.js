import { flow, find, first } from 'lodash/fp';

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const mapToGridValues = grid =>
  winningCombinations.map(combination => combination.map(cell => grid[cell]));

const winningCombination = combination =>
  combination.reduce((won, cell) => won > 0 && won === cell && won);

const calculateWinner = grid =>
  flow(
    mapToGridValues,
    find(winningCombination),
    first,
  )(grid);

export default calculateWinner;
