import React from 'react';
import { Link } from 'react-router-dom';
import styles from './link-button.module.css';

type Props = {
  link: string;
  buttonName: string;
  clickHandler?: () => void;
};

export const LinkButton: React.FC<Props> = ({ link, buttonName, clickHandler }) => (
  <Link to={link} onClick={clickHandler} className={styles['link-button']}>
    {buttonName}
  </Link>
);
