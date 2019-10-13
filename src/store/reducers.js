import { handleActions } from 'redux-actions';
import { setWinner, changePlayer, cellClicked, reset } from './actions';

const initialState = {
  winner: null,
  currentPlayer: 1,
  grid: Array(9).fill(0),
};

export const gameReducer = handleActions(
  {
    [setWinner]: (state, { payload }) => ({
      ...state,
      winner: payload,
    }),
    [changePlayer]: state => ({
      ...state,
      currentPlayer: state.currentPlayer === 1 ? 2 : 1,
    }),
    [cellClicked]: (state, { payload }) => ({
      ...state,
      grid: Object.assign([...state.grid], { [payload]: state.currentPlayer }),
    }),
    [reset]: () => initialState,
  },
  initialState,
);
