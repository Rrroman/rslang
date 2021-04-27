import React from 'react';
import styles from './dashboard-text.module.css';

type Props = {
  children: Array<string | number> | string;
};

const DashboardText: React.FC<Props> = (props) => (
  <h3 className={styles.text}>{props.children}</h3>
);

export { DashboardText };
