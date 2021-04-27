import React from 'react';
import refreshIcon from '../../../assets/images/refreshing.svg';

type Props = {
  buttonClick: () => void;
};
export const RefreshButton: React.FC<Props> = ({ buttonClick }) => (
  <img
    src={refreshIcon}
    alt="refresh"
    onClick={buttonClick}
    aria-hidden="true"
  />
);
