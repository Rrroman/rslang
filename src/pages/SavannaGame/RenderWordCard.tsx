import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CurrentWordListType,
  fetchWordsList,
} from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import { WordItem } from '../../components/word-item/word-item-savanna';
import styles from './SavannaGame.module.css';
import { shuffle } from '../../utils/shuffle';
import { gameType } from '../../utils/constants';
import FallingWord from './FallingWord';
import {
  currentPlayWords,
  isWordFalled,
  isWordMove,
  listRightWords,
  setLearnWords,
  setWrongWords,
  stepCounter,
  wordPosition,
  wordUserAnswer,
  wordRight,
  isAnswerSelected,
  startWordPosition,
  savannaGameStart,
  isShowResults,
  stopPosition,
} from '../../actions/savanna-game-actions';
import {
  checkAndSaveMaxCombo,
  setWorldResult,
} from '../../actions/game-result-actions';
import { userWordToLearnResult } from '../../actions/user-words-action';
import { setStatistics } from '../../actions/statistic-action';

const RenderWordCard: React.FC = () => {
  const dispatch = useDispatch();

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
  const roundCounter = useSelector(
    (state: RootStateType) => state.savannaGameState.stepCounter
  );
  const position = useSelector(
    (state: RootStateType) => state.savannaGameState.wordPosition
  );
  const startPosition = useSelector(
    (state: RootStateType) => state.savannaGameState.startWordPosition
  );
  const listWrongWords = useSelector(
    (state: RootStateType) => state.savannaGameState.listWrongWords
  );
  const listLearnWords = useSelector(
    (state: RootStateType) => state.savannaGameState.listLearnWords
  );
  const isResults = useSelector(
    (state: RootStateType) => state.savannaGameState.isShowResults
  );
  const user = useSelector((state: RootStateType) => state.userState.user);

  const gameResult = useSelector(
    (state: RootStateType) => state.gameResultState
  );

  const isLevelVisible = useSelector(
    (state: RootStateType) => state.menuState.isLevelVisible
  );

  const currentWordList = useSelector(
    (state: RootStateType) => state.wordState.currentWordList
  );

  const border = useSelector(
    (state: RootStateType) => state.savannaGameState.stopPosition
  );

  const fullScreen = useSelector((state: RootStateType) =>
    state.savannaGameState.isFullScreen);

  const userState = useSelector((state: RootStateType) => state.userState);

  const refStop = useRef<HTMLDivElement>();

  const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const params = {
    userId: user.userId,
    token: user.token,
    wordId: rightWord.id,
  };

  useLayoutEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {

      if (refStop.current) {
        // console.log(refStop.current.getBoundingClientRect().y)
        dispatch(stopPosition(refStop.current.getBoundingClientRect().y));
      }
    }, 1000);

    return () => clearTimeout(timer);

  }, [fullScreen])


  useEffect(() => {
    if (currentWords.length === 0) {
      return;
    }
    let random;
    do {
      random = currentWords[getRandomInt(0, currentWords.length - 1)];
    } while (listLearnWords.includes(random.id));
    // console.log(listLearnWords);
    // console.log(random);
    // console.log('wrong', listWrongWords)
    dispatch(wordRight(random));
    dispatch(setLearnWords(random.id));
  }, [currentWords]);

  useEffect(() => {
    if (Object.keys(userAnswer).length === 0 && !isAnswer) {
      return;
    }
    if (userAnswer.word === rightWord.word) {
      dispatch(listRightWords(rightWord));
      console.log('right add', listRightWords)
      dispatch(setWorldResult(true, rightWord.id));
      if (userState.isLogin) {
        dispatch(userWordToLearnResult(params, { isCorrect: true }));
      }
    } else {
      dispatch(setWrongWords(rightWord));
      console.log('wrong', listWrongWords);
      dispatch(setWorldResult(false, rightWord.id));
      if (userState.isLogin) {
        dispatch(userWordToLearnResult(params, { isCorrect: false }));
      }
    }
  }, [roundCounter, isResults]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isAnswer) {
      timer = setTimeout(() => {
        dispatch(startWordPosition(0));
        playGame();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isAnswer]);


  const playGame = () => {
    if (refStop.current) {
      // console.log(refStop.current.getBoundingClientRect().y)
    }

    console.log('rightWord', rightWord.id);

    dispatch(userAnswer({}));
    dispatch(isWordMove(true));
    dispatch(isWordFalled(false));
    dispatch(isAnswerSelected(false));
    if (wordList === undefined) {
      return;
    }
    const currentPlayList = shuffle(wordList).filter(
      (item: Object, index: number) => index < 4
    );
    dispatch(currentPlayWords(currentPlayList));
    // dispatch(stepCounter(roundCounter + 1));
  };

  const checkUserAnswer = (word: CurrentWordListType) => {
    if (!isAnswer) {
      dispatch(wordUserAnswer(word));
    }
    dispatch(isAnswerSelected(true));
    dispatch(isAnswerSelected(true));
    dispatch(isWordMove(false));
    dispatch(stepCounter(roundCounter + 1));
  }

  const showResults = () => {
    const param = {
      userId: user.userId,
      token: user.token,
    };
    const body = {
      gameType: gameType.savanna,
      know: gameResult.correctCount,
      dont_know: gameResult.incorrectCount,
      combo: gameResult.maxCorrectComboCount,
      wordsId: gameResult.wordsIdArr,
    };
    dispatch(checkAndSaveMaxCombo());
    if (
      isLevelVisible ||
      currentWordList[0].userWord?.difficulty === 'deleted'
    ) {
      dispatch(setStatistics(param, body));
    }
    dispatch(isShowResults(true));
    dispatch(savannaGameStart(false))
    // dispatch(stepCounter(roundCounter + 1));
    dispatch(isWordMove(false));
  }


  return (
    <div className={styles.falling__word__container}>
      {roundCounter === 11 ? (
        <button
          type="button"
          onClick={() => showResults()}
          className={styles.playing__btn}
        >
          Показать результат
        </button>
      ) : (
        <FallingWord />
      )}

      <div ref={refStop as React.RefObject<HTMLDivElement>} className={styles.word__list}>
        {currentWords.map((word: CurrentWordListType, index: number) => (
          <WordItem
            buttonClick={() => {
              checkUserAnswer(word);
            }}
            key={word.id}
            word={word}
          />
        ))}
      </div>
    </div>
  );
};

export default RenderWordCard;
