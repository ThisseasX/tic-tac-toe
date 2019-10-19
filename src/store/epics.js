import {
  setWinner,
  calculateWinner,
  changePlayer,
  clickCell,
  cellClicked,
} from './actions';
import { ofType, combineEpics } from 'redux-observable';
import { map, filter, mergeMap } from 'rxjs/operators';
import { calculateWinner as calculateWinnerUtil } from 'utils';
import { identity } from 'lodash/fp';

const noAction = { type: 'NO_ACTION' };

const clickCellEpic = (action$, state$) =>
  action$.pipe(
    ofType(clickCell),
    filter(({ payload }) => {
      const { grid, winner } = state$.value.game;
      return !grid[payload] && !winner;
    }),
    mergeMap(({ payload }) => [
      cellClicked(payload),
      calculateWinner(),
      changePlayer(),
    ]),
  );

const calculateWinnerEpic = (action$, state$) =>
  action$.pipe(
    ofType(calculateWinner),
    map(() => {
      const { grid } = state$.value.game;
      const winner = calculateWinnerUtil(grid);

      return winner
        ? setWinner(winner)
        : grid.every(identity)
        ? setWinner(0)
        : noAction;
    }),
  );

const gameEpic = combineEpics(clickCellEpic, calculateWinnerEpic);

export { gameEpic };
