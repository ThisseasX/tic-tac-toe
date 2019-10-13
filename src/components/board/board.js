import React from 'react';
import classes from './style.module.sass';
import clsx from 'clsx';
import { connectProps } from './props';

const getSign = currentPlayer =>
  ({
    1: 'X',
    2: 'O',
  }[currentPlayer]);

const Board = ({ winner, currentPlayer, grid, clickCell, reset }) => {
  const handleClick = e => {
    e.preventDefault();

    const index = e.target.dataset.cell;

    clickCell(index);
  };

  return (
    <div className={classes.card}>
      <h1 className={clsx(classes.status, winner && classes[getSign(winner)])}>
        {winner === 0
          ? `No Winner`
          : winner > 0
          ? `The Winner is: ${getSign(winner)}`
          : `Current Player: ${getSign(currentPlayer)}`}
      </h1>
      <div className={classes.grid}>
        {grid.map((x, i) => (
          <div
            key={i}
            className={classes[getSign(x)]}
            data-cell={i}
            onMouseDown={handleClick}
          >
            {getSign(x)}
          </div>
        ))}
      </div>
      <button className={classes.reset} onClick={reset}>
        RESET
      </button>
    </div>
  );
};

export default connectProps(Board);
