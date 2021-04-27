import React from 'react';
import styles from './button-main.module.css';

type Props = {
  text: string;
  clickOnButton?: () => void;
  type: string;
};

const MainButton: React.FC<Props> = ({ text, clickOnButton, type }) => (
  <input
    className={styles['main-button']}
    onClick={clickOnButton}
    type={type}
    value={text}
  />
);

export { MainButton };
