import {
  setWinner,
  calculateWinner,
  changePlayer,
  clickCell,
  cellClicked,
} from './actions';
import { ofType, combineEpics } from 'redux-observable';
import { map, filter, mergeMap } from 'rxjs/operators';

const noAction = { type: 'NO_ACTION' };

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

const clickCellEpic = (action$, state$) =>
  action$.pipe(
    ofType(clickCell),
    filter(({ payload }) => {
      const { grid, winner } = state$.value.game;
      return !grid[payload] && !winner;
    }),
    mergeMap(({ payload }) => [cellClicked(payload), calculateWinner(), changePlayer()]),
  );

const calculateWinnerEpic = (action$, state$) =>
  action$.pipe(
    ofType(calculateWinner),
    map(() => {
      const { grid, currentPlayer } = state$.value.game;

      const won = winningCombinations.some(condition =>
        condition.every(cell => grid[cell] === currentPlayer),
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

const gameEpic = combineEpics(clickCellEpic, calculateWinnerEpic);

export { gameEpic };
