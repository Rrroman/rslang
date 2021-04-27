import React from 'react';
import audioIcon from '../../../assets/images/audioOn.svg';

type Props = {
  buttonClick: () => void;
};
export const AudioOnButton: React.FC<Props> = ({ buttonClick }) => (
  <img src={audioIcon} alt="audio" onClick={buttonClick} aria-hidden="true" />
);
