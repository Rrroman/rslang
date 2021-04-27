import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import React, { useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import {
  addLearnedWord,
  setComboCounter,
  setFullScreenStatus,
  setLearnCount,
  setRoundEnd,
  setWordCorrectness,
  setWordObj,
  updateCharsPosition,
} from '../../actions/constructor-game-actions';
import { ReactComponent as AudioOn } from '../../assets/images/audioOn.svg';
import { ReactComponent as CatSleeping } from '../../assets/images/cat-sleeping.svg';
import { RootStateType } from '../../reducer/root-reducer';
import { mainPath } from '../../utils/constants';
import { shuffle } from '../../utils/shuffle';
import Spinner from '../Spinner/Spinner';
import { BottomBlock } from './BottomBlock/BottomBlock';
import styles from './ConstructorGame.module.css';
import { DragEndDrop } from './DragEndDrop/DragEndDrop';
import { StartScreen } from './Start-screen/Start-screen';
import { TopBlock } from './TopBlock/TopBlock';

type WordObjectType = { [key: string]: string };

const ConstructorGame: React.FC = () => {
  const dispatch = useDispatch();

  const {
    shuffledWordList,
    wordObj,
    constructorRoundStatus: isRoundEnd,
    learned,
    roundCount,
    chars,
    comboCounter,
  } = useSelector((state: RootStateType) => state.constructorGameState);

  useEffect(() => {
    dispatch(setWordObj(shuffledWordList[roundCount - 1]));
  }, [shuffledWordList, roundCount]);

  const [wordSound] = useSound(
    `${mainPath.langUrl}${wordObj === undefined ? '' : wordObj.audio}`,
    {
      interrupt: true,
    }
  );

  const constructorGameIsStarted = useSelector(
    (state: RootStateType) =>
      state.constructorGameState.constructorGameIsStarted
  );

  useEffect(() => {
    if (wordObj === undefined) {
      return;
    }
    if (wordObj.word === undefined) {
      return;
    }
    const wordArray = wordObj.word.split('');

    let shuffledWordArray: string[] = shuffle(wordArray);
    if (shuffledWordArray.join('') === wordArray.join('')) {
      shuffledWordArray = shuffle(wordArray);
    }

    const wordObject: WordObjectType = {};
    shuffledWordArray.forEach((char, index) => {
      wordObject[index.toString()] = char;
    });

    const charArray = Object.entries(wordObject);

    dispatch(updateCharsPosition(charArray));

    if (isRoundEnd) {
      const startWordObject: WordObjectType = {};
      wordArray.forEach((char, index) => {
        startWordObject[index.toString()] = char;
      });

      const resultArray = Object.entries(startWordObject);
      dispatch(updateCharsPosition(resultArray));
    }
  }, [wordObj, isRoundEnd]);

  useEffect(() => {
    if (chars === undefined) {
      return;
    }

    if (wordObj === undefined) {
      return;
    }

    const currentChars = chars.map((char) => char[1]).join('');

    if (wordObj.word === currentChars) {
      dispatch(setRoundEnd(true));
      wordSound();
    }
  }, [wordObj, chars]);

  useEffect(() => {
    if (chars === undefined) {
      return;
    }

    if (wordObj === undefined) {
      return;
    }

    const currentChars = chars.map((char) => char[1]).join('');
    if (wordObj.word === currentChars && isRoundEnd) {
      dispatch(setComboCounter(comboCounter + 1));
      dispatch(addLearnedWord(wordObj));
      dispatch(setLearnCount(learned + 1));
      dispatch(setWordCorrectness(true));
    }
  }, [isRoundEnd]);

  const handle = useFullScreenHandle();

  const isFullScreen = useSelector(
    (state: RootStateType) => state.constructorGameState.isFullScreen
  );

  function fullScreenEnterHandler() {
    dispatch(setFullScreenStatus(true));
    handle.enter();
  }

  function fullScreenExitHandler() {
    handle.exit();
    dispatch(setFullScreenStatus(false));
  }

  return constructorGameIsStarted ? (
    <FullScreen handle={handle} className={styles['my-game']}>
      {wordObj ? (
        <>
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

          <TopBlock />
          {isRoundEnd ? (
            <button
              type="button"
              className={
                isFullScreen
                  ? `${styles['audio-button']} ${styles['full-screen__audio-button']}`
                  : `${styles['audio-button']}`
              }
              onClick={() => wordSound()}
            >
              <AudioOn fill="#733999" />
            </button>
          ) : null}
          <DragEndDrop />
          {wordObj ? (
            <img
              className={styles.picture}
              width="256px"
              height="166px"
              src={`${mainPath.langUrl}${wordObj.image}`}
              alt={wordObj.word}
            />
          ) : (
            <Spinner />
          )}

          <BottomBlock />
          <CatSleeping className={styles.cat_sleeping} />
        </>
      ) : (
        <Spinner />
      )}
    </FullScreen>
  ) : (
    <StartScreen />
  );
};

export default ConstructorGame;
