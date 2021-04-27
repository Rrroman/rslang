import React from 'react';
import { Link } from 'react-router-dom';
import styles from './dashboard-button.module.css';

type Props = {
  link: string;
  buttonName: string;
};

export const DashboardButton: React.FC<Props> = ({ link, buttonName }) => (
  <Link to={link} className={styles['link-button']}>
    <div className={styles['div-button']}>{buttonName}</div>
  </Link>
);
