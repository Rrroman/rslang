import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useSound from 'use-sound';
import { useDispatch, useSelector } from 'react-redux';
import { useFullScreenHandle } from 'react-full-screen';
import { RootStateType } from '../../reducer/root-reducer';
import styles from './AudioGame.module.css';
import { PlayButton } from '../../components/button-icons/playBig-button/playBig-button';
import {
  audioGameStart,
  isAnswerSelected,
  currentPlayWords,
  isFullScreen,
  stepCounter,
  clearWords,
  isShowResults,
  setLearnWords,
  wordUserAnswer,
} from '../../actions/audioGame-actions';
import ControlledSelect from '../../components/ControlledSelect/ControlledSelect';
import { shuffle } from '../../utils/shuffle';
import { mainPath } from '../../utils/constants';
import { ReactComponent as CatAudio } from '../../assets/images/cat-audio-game.svg';
import Results from './Results';
import { clearAllCount } from '../../actions/game-result-actions';

const StartScreen: React.FC = () => {
  const dispatch = useDispatch();

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
  const listLearnWords = useSelector(
    (state: RootStateType) => state.audioGameState.listLearnWords
  );
  const userAnswer = useSelector(
    (state: RootStateType) => state.audioGameState.wordUserAnswer
  );
  const isLevelVisible = useSelector(
    (state: RootStateType) => state.menuState.isLevelVisible
  );

  const [play] = useSound(`${mainPath.langUrl}${rightWord.audio}`, {
    interrupt: true,
  });

  useEffect(() => {
    playSoundWord();
  }, [play]);

  const playSoundWord = () => {
    if (isPlaying && Object.keys(rightWord).length > 0) {
      play();
    }
  };

  const startGame = () => {
    dispatch(clearAllCount());
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
    <div className={styles.game__content}>
      {isResults ? (
        <Results />
      ) : (
        <div className={styles.game__inner}>
          <div className={styles.game__title}>Аудиовызов</div>
          <div className={styles.game__decription}>
            Тренировка улучшает восприятие английской речи на слух. Выберите из
            предложенных вариантов ответа правильный перевод слова, которое
            услышите
          </div>
          <PlayButton
            buttonClick={() => {
              dispatch(audioGameStart(true));
              startGame();
            }}
          />
          {isLevelVisible ? <ControlledSelect /> : null}
        </div>
      )}

      <CatAudio className={styles.cat__image} />
    </div>
  );
};
export default StartScreen;
