import React, { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../reducer/root-reducer';
import styles from './LevelInfo.module.css';
import { PlayButton } from "../../components/button-icons/playBig-button/playBig-button";
import { audioGameStart, wordUserAnswer, wordRight, isAnswerSelected, currentPlayWords } from '../../actions/audioGame-actions';
import ControlledSelect from "../../components/ControlledSelect/ControlledSelect";
import { shuffle } from '../../utils/shuffle';
import { mainPath } from '../../utils/constants';
import { ReactComponent as CatAudio } from '../../assets/images/cat-audio-game.svg';
import { savannaGameStart } from '../../actions/savanna-game-actions';
import { LevelIcon } from '../../components/button-icons/level-icons/level-icons';

const LevelInfo: React.FC = () => {
  const dispatch = useDispatch();

  const isPlaying = useSelector((state: RootStateType) => state.savannaGameState.savannaGameStart);
  const wordList = useSelector((state: RootStateType) => state.wordState.currentWordList);
  const userAnswer = useSelector((state: RootStateType) => state.savannaGameState.wordUserAnswer);
  const rightWord = useSelector((state: RootStateType) => state.savannaGameState.wordRight);
  const isAnswer = useSelector((state: RootStateType) => state.savannaGameState.isAnswerSelected);
  const currentWords = useSelector((state: RootStateType) => state.savannaGameState.currentPlayWords);

  return (
    <div className={styles.game__level}>
      <div>
        Уровень
      </div>
      <div className={styles.level__container}>
        <LevelIcon number={1} type={0} buttonClick={() => console.log('info')} />
        <LevelIcon number={2} type={0} buttonClick={() => console.log('info')} />
        <LevelIcon number={3} type={0} buttonClick={() => console.log('info')} />
        <LevelIcon number={4} type={0} buttonClick={() => console.log('info')} />
        <LevelIcon number={5} type={0} buttonClick={() => console.log('info')} />
        <LevelIcon number={6} type={0} buttonClick={() => console.log('info')} />
      </div>

    </div>
  )
}
export default LevelInfo;