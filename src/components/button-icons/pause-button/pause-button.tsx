import React from 'react';
import pauseIcon from '../../../assets/images/pause.svg';

type Props = {
  buttonClick: () => void;
};
export const PauseButton: React.FC<Props> = ({ buttonClick }) => (
  <img src={pauseIcon} alt="pause" onClick={buttonClick} aria-hidden="true" />
);
