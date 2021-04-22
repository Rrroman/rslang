import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import { RootStateType } from '../../reducer/root-reducer';
import styles from './AudioGame.module.css';
import { audioGameStart, wordUserAnswer, isAnswerSelected, currentPlayWords, isPressDontknow, stepCounter, isShowResults } from '../../actions/audioGame-actions';
import { shuffle } from '../../utils/shuffle';
import wrongSound from '../../assets/sounds/src_music_wrong.wav';
import { gameType } from '../../utils/constants';
import { setStatistics } from '../../actions/statistic-action';
import { GameStatistic } from '../../reducer/statistic-state-types';
import { checkAndSaveMaxCombo } from '../../actions/game-result-actions';


const NextBtn: React.FC = () => {
  const dispatch = useDispatch();
  const wordList = useSelector((state: RootStateType) =>
    state.wordState.currentWordList);
  const rightWord = useSelector((state: RootStateType) =>
    state.audioGameState.wordRight);
  const isAnswer = useSelector((state: RootStateType) =>
    state.audioGameState.isAnswerSelected);
  const roundCounter = useSelector((state: RootStateType) =>
    state.audioGameState.stepCounter);
  const rightWords = useSelector((state: RootStateType) =>
    state.audioGameState.listRightWords);
  const listWrongWords = useSelector((state: RootStateType) =>
    state.audioGameState.listWrongWords);
  const listLearnWords = useSelector((state: RootStateType) =>
    state.audioGameState.listLearnWords);
  const isResults = useSelector(
    (state: RootStateType) => state.audioGameState.isShowResults);
  const gameResult = useSelector(
    (state: RootStateType) => state.gameResultState);

  const isLevelVisible = useSelector(
    (state: RootStateType) => state.menuState.isLevelVisible
  );

  const currentWordList = useSelector(
    (state: RootStateType) => state.wordState.currentWordList
  );


  const [playWrongAnswer] = useSound(wrongSound);
  const wordCount = wordList.length;

  const user = useSelector((state: RootStateType) => state.userState.user);


  const playGame = () => {
    if (wordList === undefined) {
      return;
    }
    dispatch(isAnswerSelected(false));
    dispatch(isPressDontknow(false));
    const currentPlayList = shuffle(wordList)
      .filter((item: Object, index: number) => index < 5);
    dispatch(currentPlayWords(currentPlayList));

  }

  const dontKnowANswer = () => {
    playWrongAnswer();
    dispatch(stepCounter(roundCounter + 1));
    dispatch(isPressDontknow(true));
    dispatch(wordUserAnswer(rightWord));
    dispatch(isAnswerSelected(true))
  }



  const showResults = () => {

    dispatch(isShowResults(true));
    dispatch(audioGameStart(false));
    const param = {
      userId: user.userId,
      token: user.token,
    };
    const body = {
      gameType: gameType.audiocall,
      know: gameResult.correctCount,
      dont_know: gameResult.incorrectCount,
      combo: gameResult.maxCorrectComboCount,
      wordsId: gameResult.wordsIdArr,
    };

    if (
      isLevelVisible ||
      currentWordList[0].userWord?.difficulty === 'deleted'
    ) {
      return;
    }
    dispatch(setStatistics(param, body));
    dispatch(checkAndSaveMaxCombo());

  }




  return isAnswer ? (
    <div>
      {(roundCounter === 10 || roundCounter === wordCount) ? (
        <button type="button" onClick={() => showResults()} className={styles.playing__btn}>
          Показать результат
        </button>
      ) :
        (<button aria-label='word-btn' type="button" className={styles.add__aswer} onClick={() => {
          playGame()
        }} />)
      }
    </div>
  ) : (
    <button onClick={() => { dontKnowANswer() }} type='button' className={styles.playing__btn}>
      Не знаю
    </button >
  )

}

export default NextBtn;