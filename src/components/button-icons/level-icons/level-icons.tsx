import React from 'react';
import styles from './level-icons.module.css';

type Props = {
  buttonClick?: () => void;
  number: number;
  type: 0 | 1;
};
export const LevelIcon: React.FC<Props> = ({ buttonClick, number, type }) => (
  <div
    onClick={buttonClick}
    aria-hidden="true"
    className={`${styles['level-style']} ${
      type === 0 ? styles['level-inactive'] : styles['level-active']
    }`}
  >
    {number}
  </div>
);
