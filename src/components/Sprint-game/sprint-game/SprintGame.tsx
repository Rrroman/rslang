import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearWords,
  sprintGameBallsCounter,
  sprintGameCheckPoints,
  sprintGameStatusChange,
  sprintGameTotalPoints,
} from '../../../actions/sprint-game-action';
import { ReactComponent as Cat } from '../../../assets/images/cat2.svg';
import { ReactComponent as Timer1 } from '../../../assets/images/timer1.svg';
import GamePage from '../game-page/GamePage';
import FinishPage from '../finish-page/FinishPage';
import { RootStateType } from '../../../reducer/root-reducer';
import { Timer } from '../timer/Timer';
import { TitleGamePage } from '../title-page/TitleGamePage';
import styles from './sprint-game.module.css';
import { clearAllCount } from '../../../actions/game-result-actions';

const SprintGame: React.FC = () => {
  const dispatch = useDispatch();

  const gameStatuses = useSelector(
    (state: RootStateType) => state.sprintGameState
  );

  const { gameStatus } = gameStatuses;

  const renderTimerPage = () => (
    <div className={`${styles.game__wrapper} ${styles.timer__page}`}>
      <div className={styles.firstWatch__wrapper}>
        <Timer initialTimer={5} nextPage="play" timerFontSize="6.4rem" />
        <Timer1 className={styles.first__timer} />
      </div>
      <p className={styles.prepare}>Приготовьтесь!</p>
      <Cat className={styles.cat__img} />
    </div>
  );

  useEffect(() => {
    dispatch(sprintGameStatusChange('start'));
    dispatch(clearWords());
    dispatch(sprintGameTotalPoints(0));
    dispatch(sprintGameBallsCounter(0));
    dispatch(sprintGameCheckPoints(0));
    dispatch(clearAllCount());
  }, []);

  return (
    <div className={styles.sprint__game}>
      {gameStatus === 'start' ? <TitleGamePage /> : null}
      {gameStatus === 'timer' ? renderTimerPage() : null}
      {gameStatus === 'play' ? <GamePage /> : null}
      {gameStatus === 'finish' ? <FinishPage /> : null}
    </div>
  );
};

export default SprintGame;
