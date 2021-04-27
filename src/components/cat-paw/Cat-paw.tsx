import React from 'react';
import styles from './cat-paw.module.css';

type Props = {
  number: number;
  type?: string;
};
export const CatPaw: React.FC<Props> = ({ number, type }) => {
  if (type === 'small-black') {
    switch (number % 2) {
      case 0:
        return <div className={styles.pawBlack1}>{number + 1}</div>;
      case 1:
        return <div className={styles.pawBlack2}>{number + 1}</div>;
    }
  }
  if (type === 'big') {
    switch (number) {
      case 0:
        return <div className={styles.pawBig1} />;
      case 1:
        return <div className={styles.pawBig2} />;
      case 2:
        return <div className={styles.pawBig3} />;
      case 3:
        return <div className={styles.pawBig4} />;
      default:
        return null;
    }
  } else {
    switch (number % 4) {
      case 0:
        return <div className={styles.paw1}>{number + 1}</div>;
      case 1:
        return <div className={styles.paw2}>{number + 1}</div>;
      case 2:
        return <div className={styles.paw3}>{number + 1}</div>;
      case 3:
        return <div className={styles.paw4}>{number + 1}</div>;
      default:
        return null;
    }
  }
};
