import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CurrentWordListType
} from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import { WordItem } from '../../components/word-item/word-item-game';
import styles from './AudioGame.module.css';
import { wordUserAnswer, wordRight, isAnswerSelected, listRightWords, setWrongWords, setLearnWords, stepCounter } from '../../actions/audioGame-actions';
import { setWorldResult } from '../../actions/game-result-actions';
import { userWordToLearnResult } from '../../actions/user-words-action';


const RenderWordCard: React.FC = () => {

  const dispatch = useDispatch();
  const userAnswer = useSelector((state: RootStateType) =>
    state.audioGameState.wordUserAnswer);
  const rightWord = useSelector((state: RootStateType) =>
    state.audioGameState.wordRight);
  const isAnswer = useSelector((state: RootStateType) =>
    state.audioGameState.isAnswerSelected);
  const currentWords = useSelector((state: RootStateType) =>
    state.audioGameState.currentPlayWords);
  const isDontknow = useSelector((state: RootStateType) =>
    state.audioGameState.isPressDontknow);
  const listLearnWords = useSelector((state: RootStateType) =>
    state.audioGameState.listLearnWords);
  const roundCounter = useSelector((state: RootStateType) =>
    state.audioGameState.stepCounter);
  const isResults = useSelector((state: RootStateType) =>
    state.audioGameState.isShowResults);
  const user = useSelector((state: RootStateType) =>
    state.userState.user);
  const userState = useSelector((state: RootStateType) => state.userState);


  const getRandomInt = (min: number, max: number) => (
    Math.floor(Math.random() * (max - min + 1)) + min
  )

  const params = {
    userId: user.userId,
    token: user.token,
    wordId: rightWord.id
  }

  useEffect(() => {
    if (currentWords.length === 0) {
      return;
    }
    let random;
    do {
      random = currentWords[getRandomInt(0, currentWords.length - 1)];
    }
    while (listLearnWords.includes(random.id));

    dispatch(wordRight(random));
    dispatch(setLearnWords(random.id));

  }, [currentWords])

  useEffect(() => {
    if (Object.keys(userAnswer).length === 0 && !isAnswer) {
      return
    }
    if (!isDontknow && userAnswer.word === rightWord.word) {
      dispatch(listRightWords(rightWord));
      dispatch(setWorldResult(true, rightWord.id));
      if (userState.isLogin) {
        dispatch(userWordToLearnResult(params, { isCorrect: true }))
      }
    }
    else {
      dispatch(setWrongWords(rightWord));
      dispatch(setWorldResult(false, rightWord.id));
      if (userState.isLogin) {
        dispatch(userWordToLearnResult(params, { isCorrect: false }))
      }
    }
  }, [roundCounter, isResults])

  const checkUserAnswer = (word: CurrentWordListType) => {
    if (!isAnswer) {
      dispatch(wordUserAnswer(word));
    }
    dispatch(isAnswerSelected(true));
    dispatch(stepCounter(roundCounter + 1));
  }

  return (
    <div className={styles.word__list}>
      {currentWords.map((word: CurrentWordListType, index: number) => (

        <WordItem buttonClick={() => { checkUserAnswer(word); }}
          key={word.id} word={word} />
      ))}
    </div>
  )
}

export default RenderWordCard;