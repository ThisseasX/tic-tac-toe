import { setWinner, changePlayer, clickCell, reset } from 'store';
import { connect } from 'react-redux';

const mapStateToProps = ({ game: { winner, currentPlayer, grid } }) => ({
  winner,
  currentPlayer,
  grid,
});

const mapDispatchToProps = dispatch => ({
  setWinner: payload => dispatch(setWinner(payload)),
  changePlayer: () => dispatch(changePlayer()),
  clickCell: payload => dispatch(clickCell(payload)),
  reset: () => dispatch(reset()),
});

export const connectProps = connect(
  mapStateToProps,
  mapDispatchToProps,
);
