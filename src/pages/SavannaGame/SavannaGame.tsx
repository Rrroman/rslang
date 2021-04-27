import React, { useEffect } from 'react';
import useSound from 'use-sound';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWordsList } from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import Spinner from '../../components/Spinner/Spinner';
import styles from './SavannaGame.module.css';
import { mainPath } from '../../utils/constants';
import successSound from '../../assets/sounds/src_music_correct.mp3';
import wrongSound from '../../assets/sounds/src_music_wrong.wav';
import RenderWordCard from './RenderWordCard';
import CatSavanna from '../../assets/images/CAT_gif_0.05.gif';
import StartScreen from './StartScreen';
import SettingsBtn from './SettingsBtn';
import LevelInfo from './LevelInfo';
import LifeInfo from './LifeInfo';

import {
  isShowResults,
  setLearnWords,
  wordRight,
} from '../../actions/savanna-game-actions';

const SavannaGame: React.FC = () => {
  const isPlaying = useSelector(
    (state: RootStateType) => state.savannaGameState.savannaGameStart
  );
  const wordList = useSelector(
    (state: RootStateType) => state.wordState.currentWordList
  );
  const userAnswer = useSelector(
    (state: RootStateType) => state.savannaGameState.wordUserAnswer
  );
  const rightWord = useSelector(
    (state: RootStateType) => state.savannaGameState.wordRight
  );
  const isAnswer = useSelector(
    (state: RootStateType) => state.savannaGameState.isAnswerSelected
  );
  const currentWords = useSelector(
    (state: RootStateType) => state.savannaGameState.currentPlayWords
  );
  const stepCounter = useSelector(
    (state: RootStateType) => state.savannaGameState.stepCounter
  );

  const [play] = useSound(`${mainPath.langUrl}${rightWord.audio}`, {
    interrupt: true,
  });

  const fullScreen = useSelector((state: RootStateType) =>
    state.savannaGameState.isFullScreen);

  const [playSuccessAnswer] = useSound(successSound);
  const [playWrongAnswer] = useSound(wrongSound);

  const handle = useFullScreenHandle();
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(isShowResults(false));
    },
    []
  );



  useEffect(() => {
    if (!isAnswer) {
      return;
    }
    if (userAnswer.word === rightWord.word) {
      playSuccessAnswer();
    }
    else {
      playWrongAnswer();
    }

  }, [isAnswer]);

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
        <div className={styles.game__field}>
          {currentWords.length === 0 ? <Spinner /> : <RenderWordCard />}
        </div>
        <img className={styles.cat__image} src={CatSavanna} alt="loading..." />
      </div>
    </FullScreen >
  ) : (
    <StartScreen />
  );
};

export default SavannaGame;
