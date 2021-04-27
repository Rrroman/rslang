import React from 'react';
import styles from './cat-test.module.css';
import img from '../../../assets/images/cat-test.png';

const CatTest: React.FC = () => (
  <img src={img} alt="" className={styles['cat-test']} />
);

export { CatTest };
