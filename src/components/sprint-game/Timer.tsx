import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sprintGameStatusChange } from '../../actions/sprint-game-action';
import styles from './sprint-game.module.css';

type Props = {
  initialTimer: number;
  nextPage: string;
};

export const Timer: React.FC<Props> = ({ initialTimer, nextPage }) => {
  const [startTimer, setStartTimer] = useState(initialTimer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (startTimer > 0) {
      setTimeout(() => setStartTimer(startTimer - 1), 1000);
    } else {
      dispatch(sprintGameStatusChange(nextPage));
    }
  }, [startTimer]);

  return <div className={styles.timer}>{startTimer}</div>;
};