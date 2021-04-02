import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../reducer/root-reducer';
import styles from './TopBlock.module.css';
import { ReactComponent as ExitButton } from '../../../assets/images/exit-button-mini.svg';
import { constructorGameStart } from '../../../actions/constructor-game-actions';
import GameHotkeys from '../GameHotkeys/GameHotkeys';
import { gameConstants } from '../../../utils/constants';

export const TopBlock: React.FC = () => {
  const { amountOfRounds } = gameConstants;
  const dispatch = useDispatch();

  const wordObj = useSelector(
    (state: RootStateType) => state.constructorGameState.wordObj
  );

  const isRoundEnd = useSelector(
    (state: RootStateType) => state.constructorGameState.constructorRoundStatus
  );

  const roundCount = useSelector(
    (state: RootStateType) => state.constructorGameState.roundCount
  );

  const endGameHandler = () => {
    dispatch(constructorGameStart(false));
  };

  return (
    <>
      <div className={styles.word__container}>
        <div className={styles.word__empty} />
        <div className={styles.word__inner}>
          <p className={`${styles.text} ${styles.word}`}>
            {wordObj ? wordObj.wordTranslate : ''}
          </p>
          {isRoundEnd ? (
            <p className={styles.word__transcription}>
              {wordObj ? wordObj.transcription : ''}
            </p>
          ) : (
            <p className={styles.description}>Собери слово из букв.</p>
          )}
        </div>
        <div
          className={styles.counter}
        >{`${roundCount}/${amountOfRounds}`}</div>
      </div>
      <button
        type="button"
        className={styles['exit-button']}
        onClick={endGameHandler}
      >
        <ExitButton />
      </button>
      <GameHotkeys />
    </>
  );
};
