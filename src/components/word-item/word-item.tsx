import React from 'react';
import { CurrentWordListType } from '../../actions/word-actions';

type Props = { word: CurrentWordListType };

const WordItem: React.FC<Props> = ({ word }) => <div>{word.word}</div>;

export { WordItem };
