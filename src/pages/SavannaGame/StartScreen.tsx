import React, { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../reducer/root-reducer';
import styles from './SavannaGame.module.css';
import { PlayButton } from "../../components/button-icons/playBig-button/playBig-button";
import { audioGameStart, wordUserAnswer, wordRight, isAnswerSelected, currentPlayWords } from '../../actions/audioGame-actions';
import ControlledSelect from "../../components/ControlledSelect/ControlledSelect";
import { shuffle } from '../../utils/shuffle';
import { mainPath } from '../../utils/constants';
import { ReactComponent as CatAudio } from '../../assets/images/cat-audio-game.svg';
import { savannaGameStart } from '../../actions/savanna-game-actions';
// import RenderWordCard from './RenderWordCard';


const StartScreen: React.FC = () => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state: RootStateType) => state.savannaGameState.savannaGameStart);
  const wordList = useSelector((state: RootStateType) => state.wordState.currentWordList);
  const userAnswer = useSelector((state: RootStateType) => state.savannaGameState.wordUserAnswer);
  const rightWord = useSelector((state: RootStateType) => state.savannaGameState.wordRight);
  const isAnswer = useSelector((state: RootStateType) => state.savannaGameState.isAnswerSelected);
  const currentWords = useSelector((state: RootStateType) => state.savannaGameState.currentPlayWords);
  const [play] = useSound(`${mainPath.langUrl}${rightWord.audio}`, { interrupt: true });

  useEffect(() => {
    playSoundWord();
  }, [play])


  const playSoundWord = () => {
    if ((isPlaying && Object.keys(rightWord).length > 0)) {
      play()
    }
  }

  const playGame = () => {
    // dispatch(wordUserAnswer(''));
    dispatch(isAnswerSelected(false));
    if (wordList === undefined) {
      return;
    }
    const currentPlayList = shuffle(wordList).filter((item: Object, index: number) => index < 4);
    dispatch(currentPlayWords(currentPlayList))
    console.log('current', currentWords)

  }

  return (
    <div className={styles.game__wrapper}>
      <div className={styles.game__startSreen}>
        <div className={styles.game__title}>Саванна</div>
        <div className={styles.game__decription}>Тренировка Саванна развивает
        словарный запас. Выберите правильный перeвод слова.</div>
        < PlayButton buttonClick={() => { dispatch(savannaGameStart(true)); playGame(); }} />
      </div>
    </div>
  )
}
export default StartScreen;