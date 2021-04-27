import React, { useEffect, useState, useCallback } from 'react';
import useSound from 'use-sound';
import { useDispatch, useSelector } from 'react-redux';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import {
  fetchWordsList,
} from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import Spinner from '../../components/Spinner/Spinner';
import styles from './AudioGame.module.css';
import { mainPath } from '../../utils/constants';
import successSound from '../../assets/sounds/src_music_correct.mp3';
import wrongSound from '../../assets/sounds/src_music_wrong.wav';
import RenderWordCard from './RenderWordCard';
import { ReactComponent as CatAudio } from '../../assets/images/cat-audio-game.svg';
import StartScreen from "./StartScreen";
import WordInfo from './WordInfo';
import NextBtn from './NextBtn';
import { ReactComponent as AudioOnSizeButton } from '../../assets/images/audioOn.svg';
import SettingsBtn from './SettingsBtn';
import { isShowResults } from '../../actions/audioGame-actions';


const AudioGame: React.FC = () => {
  const isPlaying = useSelector((state: RootStateType) =>
    state.audioGameState.audioGameStart);
  const wordList = useSelector((state: RootStateType) =>
    state.wordState.currentWordList);
  const userAnswer = useSelector((state: RootStateType) =>
    state.audioGameState.wordUserAnswer);
  const rightWord = useSelector((state: RootStateType) =>
    state.audioGameState.wordRight);
  const isAnswer = useSelector((state: RootStateType) =>
    state.audioGameState.isAnswerSelected);
  const currentWords = useSelector((state: RootStateType) =>
    state.audioGameState.currentPlayWords);
  const fullScreen = useSelector((state: RootStateType) =>
    state.audioGameState.isFullScreen);
  const isDontknow = useSelector((state: RootStateType) =>
    state.audioGameState.isPressDontknow);
  const isResults = useSelector((state: RootStateType) =>
    state.audioGameState.isShowResults);

  const [play] = useSound(`${mainPath.langUrl}${rightWord.audio}`, { interrupt: true });
  const [playSuccessAnswer] = useSound(successSound);
  const [playWrongAnswer] = useSound(wrongSound);
  const handle = useFullScreenHandle();

  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(isShowResults(false));
  }, [])

  useEffect(() => {
    if (isPlaying) {
      playSoundWord();
    }
  }, [play])

  const playSoundWord = () => {
    if (Object.keys(rightWord).length > 0) {
      play()
    }
  }

  useEffect(() => {
    if (!isAnswer) {
      return
    }
    if (userAnswer.word === rightWord.word && !isDontknow) {
      playSuccessAnswer();
    }
    else {

      playWrongAnswer()
    }

  }, [userAnswer.word])

  useEffect(() => {
    if (fullScreen) {
      handle.enter();
      return;
    }
    if (isPlaying) {
      handle.exit();
    }

  }, [fullScreen])

  return isPlaying ? (
    <FullScreen handle={handle} className={styles.fullScreen__container} >
      <div className={fullScreen ? styles.game__content__fullScreen : styles.game__content}>
        <SettingsBtn />
        {isAnswer ? (
          <WordInfo />
        ) : (
          <AudioOnSizeButton width='60px' height='60px' className={styles.audio__btn}
            onClick={() => playSoundWord()} />
        )}
        {currentWords.length === 0 ? <Spinner /> : <RenderWordCard />}
        <NextBtn />
        <CatAudio className={styles.cat__image} />
      </div>
    </FullScreen >
  ) : (
    <StartScreen />
  )
};

export default AudioGame;