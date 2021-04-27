import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  clearWords,
  constructorGameStart,
  setLearnCount,
  setRoundCount,
  setRoundEnd,
  setShuffledWordList,
} from '../../actions/constructor-game-actions';
import { clearAllCount } from '../../actions/game-result-actions';
import { ReactComponent as AudioOn } from '../../assets/images/audioOn.svg';
import { RootStateType } from '../../reducer/root-reducer';
import { gameConstants, mainPath } from '../../utils/constants';
import { shuffle } from '../../utils/shuffle';
import styles from './GameResult.module.css';

export const GameResult: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { amountOfRounds } = gameConstants;

  const currentWordList = useSelector(
    (state: RootStateType) => state.wordState.currentWordList
  );

  const { learned, learnedWords, notLearnedWords } = useSelector(
    (state: RootStateType) => state.constructorGameState
  );

  const restartHandler = () => {
    dispatch(setShuffledWordList(shuffle(currentWordList)));
    dispatch(constructorGameStart(true));
    dispatch(setLearnCount(0));
    dispatch(setRoundCount(1));
    dispatch(setRoundEnd(false));
    dispatch(clearWords());
    dispatch(clearAllCount());
  };

  const soundHandler = (soundPath: string) => {
    const sound = new Audio(`${mainPath.langUrl}${soundPath}`);

    if (sound.volume) {
      sound.currentTime = 0;
      sound.play();
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Результаты</h1>
      <div className={styles['result-wrapper']}>
        <h2 className={`${styles['sub-title']} ${styles['sub-title_success']}`}>
          Правильно: {learned}
        </h2>
        <ul className={styles.list}>
          {learnedWords.map((wordObject) => (
            <li key={wordObject.id} className={styles.list__row}>
              <button
                type="button"
                className={`${styles['audio-button']} ${styles.audio_success}`}
                onClick={() => soundHandler(wordObject.audio)}
                data-path={wordObject.audio}
              >
                <AudioOn className={styles.audio_success} />
              </button>
              <span className={styles.list__word}>{wordObject.word}</span>
              {wordObject.transcription} - {wordObject.wordTranslate}
            </li>
          ))}
        </ul>
        <hr className={styles.line} />
        <h2 className={`${styles['sub-title']} ${styles['sub-title_wasted']}`}>
          Неправильно:{' '}
          {currentWordList.length < amountOfRounds
            ? currentWordList.length - learned
            : amountOfRounds - learned}
        </h2>
        <ul className={styles.list}>
          {notLearnedWords.map((wordObject) => (
            <li key={wordObject.id} className={styles.list__row}>
              <button
                type="button"
                className={`${styles['audio-button']} ${styles.audio_wasted}`}
                onClick={() => soundHandler(wordObject.audio)}
              >
                <AudioOn />
              </button>
              <span className={styles.list__word}>{wordObject.word}</span>
              {wordObject.transcription} - {wordObject.wordTranslate}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.button__wrapper}>
        <Link
          to="/"
          onClick={() => history.goBack()}
          className={styles.restart}
        >
          Назад
        </Link>
        <button
          className={styles.restart}
          type="button"
          onClick={() => restartHandler()}
        >
          Повторить
        </button>
      </div>
    </div>
  );
};
