import { createActions } from 'redux-actions';

const SET_WINNER = 'SET_WINNER';
const CALCULATE_WINNER = 'CALCULATE_WINNER';
const CHANGE_PLAYER = 'CHANGE_PLAYER';
const CLICK_CELL = 'CLICK_CELL';
const CELL_CLICKED = 'CELL_CLICKED';
const RESET = 'RESET';

export const {
  setWinner,
  calculateWinner,
  changePlayer,
  clickCell,
  cellClicked,
  reset,
} = createActions(
  SET_WINNER,
  CALCULATE_WINNER,
  CHANGE_PLAYER,
  CLICK_CELL,
  CELL_CLICKED,
  RESET,
);
