import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import { fetchWordsList } from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import styles from './FallingWord.module.css';
import {
  isWordFalled,
  isWordMove,
  stepCounter,
  wordPosition,
  isAnswerSelected,
  startWordPosition,
} from '../../actions/savanna-game-actions';
import successSound from '../../assets/sounds/src_music_correct.mp3';
import wrongSound from '../../assets/sounds/src_music_wrong.wav';

const FallingWord: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWordsList({ page: 0, group: 0 }));
  }, []);

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

  const startPosition = useSelector(
    (state: RootStateType) => state.savannaGameState.startWordPosition
  );

  const isMove = useSelector(
    (state: RootStateType) => state.savannaGameState.isWordMove
  );

  const position = useSelector(
    (state: RootStateType) => state.savannaGameState.wordPosition
  );

  const roundCounter = useSelector(
    (state: RootStateType) => state.savannaGameState.stepCounter
  );

  const border = useSelector(
    (state: RootStateType) => state.savannaGameState.stopPosition
  );

  const [playSuccessAnswer] = useSound(successSound);
  const [playWrongAnswer] = useSound(wrongSound);

  const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const refBtn = useRef<HTMLDivElement>();
  const [timer, setTimer] = useState<ReturnType<typeof setInterval>>();

  useEffect(
    () => () => {
      clearInterval(timer as ReturnType<typeof setInterval>);
    },
    [timer]
  );

  useEffect(() => {
    if (!isMove) {
      clearInterval(timer as ReturnType<typeof setInterval>);
    }
    if (position > 323) {

      showAnswer();

      clearInterval(timer as ReturnType<typeof setInterval>);
    }
  }, [position, isMove, border]);

  const moveWord = () => {
    if (refBtn.current) {
      if (isMove && !isAnswer) {
        const newTimer = setInterval(() => {
          dispatch(wordPosition(2));
        }, 15);
        setTimer(newTimer);
        refBtn.current.style.transform = `translateY(${position}px)`;
      }
    }
  };

  useEffect(() => {
    if (refBtn.current) {
      if (isPlaying) {
        moveWord();
        refBtn.current.style.transform = `translateY(0px)`;
      }
    }
  }, [isPlaying, isAnswer]);


  const showAnswer = () => {
    dispatch(isWordFalled(true));
    dispatch(isWordMove(false));
    dispatch(startWordPosition(0));
    dispatch(isAnswerSelected(true));
    dispatch(stepCounter(roundCounter + 1));
  };

  return (
    <div
      ref={refBtn as React.RefObject<HTMLDivElement>}
      className={`${styles.falling__word}
     ${(isAnswer && userAnswer.word === rightWord.word) || isWordFalled
          ? styles.word__stop
          : ''
        }
     ${isAnswer && !isWordFalled && userAnswer.word !== rightWord.word
          ? styles.word__stop__wrong
          : ''
        }`}
      style={{ transform: `translateY(${position}px)` }}
    >
      {rightWord.word}
    </div>
  );
};

export default FallingWord;
