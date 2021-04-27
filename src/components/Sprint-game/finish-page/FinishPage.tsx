import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { clearAllCount } from '../../../actions/game-result-actions';
import {
  clearWords,
  sprintGameBallsCounter,
  sprintGameCheckPoints,
  sprintGameCurrentPoints,
  sprintGameListOfCorrectWords,
  sprintGameListOfIncorrectWords,
  sprintGameStatusChange,
  sprintGameTotalPoints,
  sprintGameWordCounter
} from '../../../actions/sprint-game-action';
import { setStatistics } from '../../../actions/statistic-action';
import { ReactComponent as AudioSvg } from '../../../assets/images/audioOn.svg';
import { RootStateType } from '../../../reducer/root-reducer';
import { difficulty, gameType, mainPath } from '../../../utils/constants';
import styles from './finish-page.module.css';

const FinishPage: React.FC = () => {
  const dispatch = useDispatch();
  const gameStatuses = useSelector(
    (state: RootStateType) => state.sprintGameState
  );
  const wordList = useSelector(
    (state: RootStateType) => state.wordState.currentWordList
  );
  const isLevelVisible = useSelector(
    (state: RootStateType) => state.menuState.isLevelVisible
  );
  const user = useSelector((state: RootStateType) => state.userState.user);
  const gameResult = useSelector(
    (state: RootStateType) => state.gameResultState
  );
  const history = useHistory();
  const { totalPoints, learntWords, notLearntWords } = gameStatuses;

  useEffect(() => {
    dispatch(sprintGameListOfIncorrectWords(''));
    dispatch(sprintGameListOfCorrectWords(''));

    const param = {
      userId: user.userId,
      token: user.token,
    };
    const body = {
      gameType: gameType.sprint,
      know: gameResult.correctCount,
      dont_know: gameResult.incorrectCount,
      combo: gameResult.maxCorrectComboCount,
      wordsId: gameResult.wordsIdArr,
    };
    if (
      !isLevelVisible &&
      wordList[0].userWord?.difficulty !== difficulty.hard
    ) {
      dispatch(setStatistics(param, body));
    }
  }, []);

  const soundHandler = (soundPath: string) => {
    const sound = new Audio(`${mainPath.langUrl}${soundPath}`);

    if (sound.volume) {
      sound.currentTime = 0;
      sound.play();
    }
  };

  const renderCorrectWordsList = () => (
    <ul className={styles['correct-words-list']}>
      {learntWords.map((wordObject) => (
        <li key={wordObject.id} className={styles['words-wrapper']}>
          <button
            type="button"
            onClick={() => soundHandler(wordObject.audio)}
            className={styles['correct-word-sound']}
          >
            <AudioSvg />
          </button>
          <span className={styles['main-word']}>{wordObject.word}</span>-
          <span className={styles.translation}>{wordObject.wordTranslate}</span>
        </li>
      ))}
    </ul>
  );

  const renderIncorrectWordList = () => (
    <ul className={styles['incorrect-words-list']}>
      {notLearntWords.map((wordObject) => (
        <li className={styles['words-wrapper']} key={wordObject.id}>
          <button
            type="button"
            onClick={() => soundHandler(wordObject.audio)}
            className={styles['incorrect-word-sound']}
          >
            <AudioSvg />
          </button>
          <span className={styles['main-word']}>{wordObject.word}</span>-
          <span className={styles.translation}>{wordObject.wordTranslate}</span>
        </li>
      ))}
    </ul>
  );

  const repeatHandler = () => {
    // dispatch(sprint)
    dispatch(sprintGameStatusChange('play'));
    dispatch(sprintGameWordCounter(0));
    dispatch(clearWords());
    dispatch(sprintGameTotalPoints(0));
    dispatch(sprintGameBallsCounter(0));
    dispatch(sprintGameCheckPoints(0));
    dispatch(sprintGameCurrentPoints(50));
    dispatch(clearAllCount());
  };

  const goBackHandler = () => {
    dispatch(sprintGameWordCounter(0));
    history.goBack();
  };

  return (
    <div className={styles['finish-game-wrapper']}>
      <h3 className={styles.result__title}>Результаты</h3>
      <div className={styles['result-wrapper']}>
        <p className={styles['result-subtitle']}>
          {' '}
          Вы набрали{' '}
          <span className={styles['points-number']}> {totalPoints} </span>очков!
        </p>
      </div>

      <div className={styles['details-wrapper']}>
        <div className={styles.correct}>Правильно: {learntWords.length} </div>

        <div className={styles['correct-word-details']}>
          {renderCorrectWordsList()}
        </div>
        <div className={styles['words-separator']}> </div>

        <div className={styles.incorrect}>
          Неправильно: {notLearntWords.length}
        </div>

        <div className={`${styles['incorrect-word-details']}`}>
          {renderIncorrectWordList()}
        </div>
      </div>

      <div className={styles['result-buttons']}>
        <Link to="/" onClick={goBackHandler} className={styles['go-back']}>
          Назад
        </Link>

        <button type="button" className={styles.repeat} onClick={repeatHandler}>
          Повторить
        </button>
      </div>
    </div>
  );
};
export default FinishPage;
