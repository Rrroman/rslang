import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearWords,
  constructorGameStart,
  setLearnCount,
  setRoundCount,
  setRoundEnd,
  setShuffledWordList,
} from '../../../actions/constructor-game-actions';
import { clearAllCount } from '../../../actions/game-result-actions';
import { fetchWordsList } from '../../../actions/word-actions';
import { ReactComponent as CatSleeping } from '../../../assets/images/cat-sleeping.svg';
import { ReactComponent as Play } from '../../../assets/images/video-player-mini.svg';
import { RootStateType } from '../../../reducer/root-reducer';
import { shuffle } from '../../../utils/shuffle';
import ControlledSelect from '../../ControlledSelect/ControlledSelect';
import { GameResult } from '../../GameResult/GameResult';
import styles from './Start-screen.module.css';

export const StartScreen: React.FC = () => {
  const dispatch = useDispatch();

  const currentWordList = useSelector(
    (state: RootStateType) => state.wordState.currentWordList
  );

  const isResultPage = useSelector(
    (state: RootStateType) => state.constructorGameState.isResultPage
  );

  const isLevelVisible = useSelector(
    (state: RootStateType) => state.menuState.isLevelVisible
  );

  useEffect(() => {
    if (currentWordList.length === 0) {
      dispatch(fetchWordsList({ page: 0, group: 0 }));
    }
  }, []);

  const startGameHandler = () => {
    dispatch(setShuffledWordList(shuffle(currentWordList)));
    dispatch(constructorGameStart(true));
    dispatch(setLearnCount(0));
    dispatch(setRoundCount(1));
    dispatch(setRoundEnd(false));
    dispatch(clearWords());
    dispatch(clearAllCount());
  };

  return (
    <div className={styles['my-game']}>
      {isResultPage ? (
        <GameResult />
      ) : (
        <>
          <h2 className={styles.title}>конструктор слов</h2>
          <p className={styles.text}>
            Составление оригинального слова по переводу.
          </p>
          <button
            type="button"
            className={styles['play-button']}
            onClick={startGameHandler}
          >
            <Play className={styles.play} />
          </button>

          {isLevelVisible ? <ControlledSelect /> : null}

          <CatSleeping
            width="210px"
            height="142px"
            className={styles.cat_sleeping}
          />
        </>
      )}
    </div>
  );
};
