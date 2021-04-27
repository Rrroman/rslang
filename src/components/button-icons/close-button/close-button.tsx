import React from 'react';
import closeIcon from '../../../assets/images/close.svg';

type Props = {
  buttonClick: () => void;
};
export const CloseButton: React.FC<Props> = ({ buttonClick }) => (
  <img src={closeIcon} alt="close" onClick={buttonClick} aria-hidden="true" />
);
