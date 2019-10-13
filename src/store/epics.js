import {
  setWinner,
  calculateWinner,
  changePlayer,
  clickCell,
  cellClicked,
} from './actions';
import { ofType, combineEpics } from 'redux-observable';
import { map, mergeMapTo } from 'rxjs/operators';

const noAction = { type: 'NO_ACTION' };

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const clickCellEpic = (action$, state$) =>
  action$.pipe(
    ofType(clickCell),
    map(({ payload }) => {
      const { grid, winner } = state$.value.game;

      if (grid[payload] || winner) {
        return noAction;
      } else {
        return cellClicked(payload);
      }
    }),
  );

const cellClickedEpic = action$ =>
  action$.pipe(
    ofType(cellClicked),
    mergeMapTo([calculateWinner(), changePlayer()]),
  );

const calculateWinnerEpic = (action$, state$) =>
  action$.pipe(
    ofType(calculateWinner),
    map(() => {
      const { grid, currentPlayer } = state$.value.game;

      const won = winningCombinations.some(cond =>
        cond.every(cell => grid[cell - 1] === currentPlayer),
      );

      if (won) {
        return setWinner(currentPlayer);
      } else if (grid.every(x => x)) {
        return setWinner(0);
      } else {
        return noAction;
      }
    }),
  );

const gameEpic = combineEpics(clickCellEpic, cellClickedEpic, calculateWinnerEpic);

export { gameEpic };
