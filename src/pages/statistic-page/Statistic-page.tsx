import React from 'react';
import { ChartComponent } from '../../components/Chart/Chart';
import styles from './statistic-page.module.css';

export const StatisticPage: React.FC = () => (
  <div className={styles.statistic}>
    <ChartComponent />
  </div>
);
