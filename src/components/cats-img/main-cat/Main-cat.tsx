import React from 'react';
import styles from './main-cat.module.css';
import img from '../../../assets/images/cat.png';

const MainCat: React.FC = () => (
  <div className={styles['main-cat__wrapper']}>
    <div className={styles['main-cat__circle_1']} />
    <div className={styles['main-cat__circle_2']} />
    <div className={styles['main-cat__circle_3']} />
    <div className={styles['main-cat__circle_4']} />
    <img src={img} alt="" className={styles['main-cat']} />
  </div>
);

export { MainCat };
