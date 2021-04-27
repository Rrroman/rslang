import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentWordListType } from '../../actions/word-actions';
import styles from './word-item-game.module.css';
import { RootStateType } from '../../reducer/root-reducer';


type Props = {
  word: CurrentWordListType,
  buttonClick: () => void;

};

const WordItem: React.FC<Props> = ({ word, buttonClick }) => {
  const dispatch = useDispatch();
  const wordUserAnswer = useSelector((state: RootStateType) =>
    state.savannaGameState.wordUserAnswer);
  const correctWord = useSelector((state: RootStateType) =>
    state.savannaGameState.wordRight);
  const isAnswer = useSelector((state: RootStateType) =>
    state.savannaGameState.isAnswerSelected);


  return (
    < button type='button' onClick={buttonClick} className={`${styles.word__item}  ${isAnswer && wordUserAnswer.word !== correctWord.word && wordUserAnswer.word === word.word ? styles.word__item__wrong : ''} ${(isAnswer && correctWord.word === word.word) ? styles.word__item__right : ''} `}>
      { word.wordTranslate}
    </button >
  )

}


export { WordItem };
