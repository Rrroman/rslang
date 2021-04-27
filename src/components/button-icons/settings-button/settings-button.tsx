import React from 'react';
import settingsIcon from '../../../assets/images/settings-small.svg';

type Props = {
  buttonClick: () => void;
};
export const SettingsButton: React.FC<Props> = ({ buttonClick }) => (
  <img
    src={settingsIcon}
    alt="settings"
    onClick={buttonClick}
    aria-hidden="true"
  />
);
