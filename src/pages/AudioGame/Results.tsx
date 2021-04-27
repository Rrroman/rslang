import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useSound from 'use-sound';
import { useDispatch, useSelector } from 'react-redux';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { useFullScreenHandle } from 'react-full-screen';
import { RootStateType } from '../../reducer/root-reducer';
import styles from './AudioGame.module.css';
// import styles from './Results.module.css';
import { PlayButton } from '../../components/button-icons/playBig-button/playBig-button';
import {
  audioGameStart,
  wordUserAnswer,
  wordRight,
  isAnswerSelected,
  currentPlayWords,
  isFullScreen,
  stepCounter,
  listRightWords,
  clearWords,
  isShowResults,
} from '../../actions/audioGame-actions';
import ControlledSelect from '../../components/ControlledSelect/ControlledSelect';
import { shuffle } from '../../utils/shuffle';
import { mainPath } from '../../utils/constants';
import { ReactComponent as CatAudio } from '../../assets/images/cat-audio-game.svg';
import { ReactComponent as AudioOn } from '../../assets/images/audioOn.svg';

const Results: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isPlaying = useSelector(
    (state: RootStateType) => state.audioGameState.audioGameStart
  );
  const wordList = useSelector(
    (state: RootStateType) => state.wordState.currentWordList
  );
  const rightWord = useSelector(
    (state: RootStateType) => state.audioGameState.wordRight
  );
  const isResults = useSelector(
    (state: RootStateType) => state.audioGameState.isShowResults
  );
  const rightWords = useSelector(
    (state: RootStateType) => state.audioGameState.listRightWords
  );
  const wrongWords = useSelector(
    (state: RootStateType) => state.audioGameState.listWrongWords
  );

  const handle = useFullScreenHandle();
  const [play] = useSound(`${mainPath.langUrl}${rightWord.audio}`, {
    interrupt: true,
  });

  const soundHandler = (soundPath: string) => {
    const sound = new Audio(`${mainPath.langUrl}${soundPath}`);

    if (sound.volume) {
      sound.currentTime = 0;
      sound.play();
    }
  };

  useEffect(() => {
    playSoundWord();
  }, [play]);

  const playSoundWord = () => {
    if (isPlaying && Object.keys(rightWord).length > 0) {
      play();
    }
  };

  const startGame = () => {
    dispatch(isShowResults(false));
    dispatch(isAnswerSelected(false));
    dispatch(stepCounter(0));
    dispatch(clearWords());

    if (wordList === undefined) {
      return;
    }
    const currentPlayList = shuffle(wordList).filter(
      (item: Object, index: number) => index < 5
    );
    dispatch(currentPlayWords(currentPlayList));
  };

  return (
    <>
      <h1 className={styles.title}>Результаты</h1>
      <div className={styles['result-wrapper']}>
        <h2 className={`${styles['sub-title']} ${styles['sub-title_success']}`}>
          Правильно: {rightWords.length}
        </h2>
        <ul className={styles.list}>
          {rightWords.map((wordObject) => (
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
          Неправильно: {wrongWords.length}
        </h2>
        <ul className={styles.list}>
          {wrongWords.map((wordObject) => (
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
          onClick={() => {
            history.goBack();
            dispatch(audioGameStart(false));
            dispatch(isShowResults(false));
          }}
          className={styles.restart}
        >
          Назад
        </Link>
        <button
          className={styles.restart}
          type="button"
          onClick={() => startGame()}
        >
          Повторить
        </button>
      </div>
    </>
  );
};
export default Results;
