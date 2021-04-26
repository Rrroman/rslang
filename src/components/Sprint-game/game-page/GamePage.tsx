import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import React, { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import {
  checkAndSaveMaxCombo,
  clearAllCount,
  setWorldResult,
} from '../../../actions/game-result-actions';
import {
  clearWords,
  setCorrectAnswer,
  setFullScreenStatus,
  sprintGameBallsCounter,
  sprintGameCheckPoints,
  sprintGameCurrentPoints,
  sprintGameSetLearntWords,
  sprintGameSetNotLearntWords,
  sprintGameStatusChange,
  sprintGameTotalPoints,
  sprintGameWordCounter,
} from '../../../actions/sprint-game-action';
import { userWordToLearnResult } from '../../../actions/user-words-action';
import { ReactComponent as ExitButton } from '../../../assets/images/exit-button-mini.svg';
import closeIcon from '../../../assets/images/close.svg';
import correctImage from '../../../assets/images/correct.svg';
import inCorrectImage from '../../../assets/images/incorrect.svg';
import banner from '../../../assets/images/sprint-top.png';
import { ReactComponent as Timer2 } from '../../../assets/images/timer2.svg';
import correctSound from '../../../assets/sounds/src_music_correct.mp3';
import wrongSound from '../../../assets/sounds/src_music_wrong.wav';
import { RootStateType } from '../../../reducer/root-reducer';
import Balls from '../balls/Balls';
import CheckPoints from '../check-points/CheckPoints';
import { Timer } from '../timer/Timer';
import styles from './game-page.module.css';

const GamePage: React.FC = () => {
  const dispatch = useDispatch();

  const gameStatus = useSelector(
    (state: RootStateType) => state.sprintGameState
  );

  const {
    shuffledArray,
    currentPoints,
    ballsCounter,
    totalPoints,
    randomArray,
    checkpoints,
    wordCounter,
    correctAnswer,
    isFullScreen,
  } = gameStatus;

  const [wordToGuess, setWordToGuess] = useState('');
  const [playCorrectSound] = useSound(correctSound, {
    interrupt: true,
  });
  const userState = useSelector((state: RootStateType) => state.userState);
  const [playWrongSound] = useSound(wrongSound, { interrupt: true });
  const getRandomNumber = (num: number) => Math.floor(Math.random() * num);
  const user = useSelector((state: RootStateType) => state.userState.user);
  const param = {
    userId: user.userId,
    token: user.token,
    wordId: shuffledArray[wordCounter].id,
  };

  useEffect(() => {
    if (shuffledArray) {
      if (wordCounter < shuffledArray.length) {
        getRandomNumber(2) === 0
          ? setWordToGuess(shuffledArray[wordCounter].wordTranslate)
          : setWordToGuess(
            shuffledArray[randomArray[wordCounter]].wordTranslate
          );
      }
    }
  }, [wordCounter]);

  const changeGameStats = () => {
    dispatch(setWorldResult(true, shuffledArray[wordCounter].id));
    if (userState.isLogin) {
      dispatch(userWordToLearnResult(param, { isCorrect: true }));
    }
    dispatch(sprintGameSetLearntWords(shuffledArray[wordCounter]));
    changeCurrentPoints();
    dispatch(setCorrectAnswer(true));
    playCorrectSound();
    dispatch(sprintGameTotalPoints(totalPoints + currentPoints));
    dispatch(sprintGameCheckPoints(checkpoints < 3 ? checkpoints + 1 : 1));
    if (checkpoints === 2) {
      dispatch(sprintGameBallsCounter(ballsCounter + 1));
      if (ballsCounter === 4) {
        dispatch(sprintGameBallsCounter(ballsCounter));
      }
    }
  };

  const checkTheEndOfTheGame = () => {
    if (wordCounter === shuffledArray.length - 1) {
      dispatch(checkAndSaveMaxCombo());
      dispatch(sprintGameStatusChange('finish'));
    }
  };
  const handle = useFullScreenHandle();

  const fullScreenExitHandler = () => {
    dispatch(setFullScreenStatus(false));
    handle.exit();
  };

  const fullScreenEnterHandler = () => {
    dispatch(setFullScreenStatus(true));
    handle.enter();
  };
  const cleanCurrentGameStats = () => {
    dispatch(setWorldResult(false, shuffledArray[wordCounter].id));
    if (userState.isLogin) {
      dispatch(userWordToLearnResult(param, { isCorrect: false }));
    }
    dispatch(sprintGameSetNotLearntWords(shuffledArray[wordCounter]));
    dispatch(setCorrectAnswer(false));
    playWrongSound();
    dispatch(sprintGameCheckPoints(0));
  };

  const checkTheWordRight = () => {
    if (shuffledArray[wordCounter].wordTranslate === wordToGuess) {
      changeGameStats();
    } else {
      cleanCurrentGameStats();
    }
    checkTheEndOfTheGame();
    dispatch(sprintGameWordCounter(wordCounter + 1));
  };

  const checkTheWordWrong = () => {
    if (shuffledArray[wordCounter].wordTranslate !== wordToGuess) {
      changeGameStats();
    } else {
      cleanCurrentGameStats();
    }
    checkTheEndOfTheGame();
    dispatch(sprintGameWordCounter(wordCounter + 1));
  };

  const changeCurrentPoints = () => {
    if (ballsCounter === 0) {
      dispatch(sprintGameCurrentPoints(50));
    } else if (ballsCounter === 1) {
      dispatch(sprintGameCurrentPoints(60));
    } else if (ballsCounter === 2) {
      dispatch(sprintGameCurrentPoints(70));
    } else if (ballsCounter === 3) {
      dispatch(sprintGameCurrentPoints(80));
    } else if (ballsCounter === 4) {
      dispatch(sprintGameCurrentPoints(100));
    }
  };

  const endGameHandler = () => {
    dispatch(sprintGameStatusChange('start'));
    dispatch(sprintGameWordCounter(0));
    dispatch(clearWords());
    dispatch(sprintGameTotalPoints(0));
    dispatch(sprintGameBallsCounter(0));
    dispatch(sprintGameCheckPoints(0));
    dispatch(sprintGameCurrentPoints(50));
    dispatch(clearAllCount());
  };

  return (
    <FullScreen
      handle={handle}
      className={`${styles['full-screen-game']} ${styles.game__wrapper} ${styles.play}`}
    >
      <div className={styles.sidebar}>
        <div className={styles.watch__wrapper}>
          <Timer initialTimer={60} nextPage="finish" timerFontSize="1.8rem" />
          <Timer2 className={styles.timer2} />
        </div>
      </div>
      <div
        className={styles.game__field}
        style={{
          backgroundImage: `url(${banner})`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={styles.point}>
          <div className={styles.total__points}>{totalPoints}</div>
          <div className={styles.current__points}>
            <span className={styles['point-number']}>
              {currentPoints > 0 ? currentPoints : currentPoints}
            </span>
            очков за слово
          </div>
        </div>

        <div className={styles.check__points}>
          <CheckPoints />
          <Balls />
        </div>
        <div className={styles.guess__word}>
          <div className={styles.the__word}>
            {shuffledArray ? shuffledArray[wordCounter].word : null}
          </div>{' '}
          -<div className={styles.translation}>{wordToGuess}</div>
        </div>

        <div className={styles.guess_not}>
          <div className={styles.lines}> </div>
          <img
            src={correctAnswer ? correctImage : inCorrectImage}
            alt="guessed-or-not"
            className={styles.correct__sign}
          />
        </div>
        <div className={styles.button__toguess}>
          <button
            type="button"
            className={styles.green__button}
            onClick={checkTheWordRight}
          >
            Верно
          </button>
          <button
            type="button"
            className={styles.red__button}
            onClick={checkTheWordWrong}
          >
            Неверно
          </button>
        </div>
      </div>

      <div className={styles.side__buttons}>
        {isFullScreen ? (
          <button
            className={styles['full-screen__button']}
            type="button"
            onClick={() => fullScreenExitHandler()}
          >
            <FullscreenExitIcon
              className={styles['full-screen__icon']}
              width="24px"
              height="24px"
            />
          </button>
        ) : (
          <button
            className={styles['full-screen__button']}
            type="button"
            onClick={() => fullScreenEnterHandler()}
          >
            <FullscreenIcon
              className={styles['full-screen__icon']}
              width="24px"
              height="24px"
            />
          </button>
        )}

        <button
          type="button"
          className={styles.close__button}
          onClick={endGameHandler}
        >
          <ExitButton />
        </button>
      </div>
    </FullScreen>
  );
};

export default GamePage;
