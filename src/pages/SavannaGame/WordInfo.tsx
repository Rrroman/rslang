import React, { useEffect } from 'react';
import useSound from 'use-sound';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SavannaGame.module.css';
import { mainPath } from '../../utils/constants';
import {
  audioGameStart,
  wordUserAnswer,
  wordRight,
  isAnswerSelected,
  currentPlayWords,
} from '../../actions/audioGame-actions';
import { removeTagsFromString } from '../../utils/removeTagsFromString';
import { RootStateType } from '../../reducer/root-reducer';
import { AudioOnButton } from '../../components/button-icons/audiOn-button/audioOn-button';

const WordInfo: React.FC = () => {
  const dispatch = useDispatch();

  const isPlaying = useSelector(
    (state: RootStateType) => state.savannaGameState.savannaGameStart
  );
  const rightWord = useSelector(
    (state: RootStateType) => state.savannaGameState.wordRight
  );
  const [play] = useSound(`${mainPath.langUrl}${rightWord.audio}`, {
    interrupt: true,
  });
  const [playExample] = useSound(
    `${mainPath.langUrl}${rightWord.audioExample}`
  );

  useEffect(() => {
    playSoundWord();
  }, [play]);

  const playSoundWord = () => {
    if (isPlaying && Object.keys(rightWord).length > 0) {
      play();
    }
  };

  return (
    <div className={styles.word__info}>
      <div className={styles.word__image}>
        <img
          className={styles.word__image}
          src={`${mainPath.langUrl}${rightWord.image}`}
          alt={rightWord.word}
        />
      </div>
      <div className={styles.word__sound}>
        <AudioOnButton buttonClick={() => playSoundWord()} />
        <span className={styles.game__text}>
          {rightWord.word}
          {rightWord.transcription}
        </span>
      </div>
      <div className={styles.word__context}>
        <AudioOnButton buttonClick={() => playExample()} />
        <span className={styles.game__text}>
          {removeTagsFromString(rightWord.textExample)}{' '}
        </span>
      </div>
    </div>
  );
};

export default WordInfo;
