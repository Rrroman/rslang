import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearWords,
  constructorGameStart,
  setFullScreenStatus,
  setResultPageState,
} from '../../../actions/constructor-game-actions';
import { setLevelVisibility } from '../../../actions/menu-actions';
import { ReactComponent as ExitButton } from '../../../assets/images/exit-button-mini.svg';
import { RootStateType } from '../../../reducer/root-reducer';
import { gameConstants } from '../../../utils/constants';
import GameHotkeys from '../GameHotkeys/GameHotkeys';
import styles from './TopBlock.module.css';

export const TopBlock: React.FC = () => {
  const { amountOfRounds } = gameConstants;
  const dispatch = useDispatch();

  const currentWordList = useSelector(
    (state: RootStateType) => state.wordState.currentWordList
  );

  const {
    wordObj,
    roundCount,
    isFullScreen,
    constructorRoundStatus: isRoundEnd,
  } = useSelector((state: RootStateType) => state.constructorGameState);

  const endGameHandler = () => {
    dispatch(constructorGameStart(false));
    dispatch(setResultPageState(false));
    dispatch(setLevelVisibility(true));
    clearWords();

    if (isFullScreen) {
      dispatch(setFullScreenStatus(false));
    }
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
        <div className={styles.counter}>{`${roundCount}/${
          currentWordList.length < 10 ? currentWordList.length : amountOfRounds
        }`}</div>
      </div>
      <button
        type="button"
        className={styles['exit-button']}
        onClick={endGameHandler}
      >
        <ExitButton />
      </button>
      {isFullScreen ? null : <GameHotkeys />}
    </>
  );
};
