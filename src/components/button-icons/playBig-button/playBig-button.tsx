import React from 'react';
import playIcon from '../../../assets/images/play-big.svg';

type Props = {
  buttonClick: () => void;
};
export const PlayButton: React.FC<Props> = ({ buttonClick }) => (
  <img src={playIcon} alt="play" onClick={buttonClick} aria-hidden="true" />
);
