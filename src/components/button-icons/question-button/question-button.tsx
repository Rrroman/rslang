import React from 'react';
import questionIcon from '../../../assets/images/question.svg';

type Props = {
  buttonClick: () => void;
};
export const QuestionButton: React.FC<Props> = ({ buttonClick }) => (
  <img
    src={questionIcon}
    alt="question"
    onClick={buttonClick}
    aria-hidden="true"
  />
);
