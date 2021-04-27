import React from 'react';
import { Link } from 'react-router-dom';
import buttonStyles from '../../components/button-main/button-main.module.css';
import { MainCat } from '../../components/cats-img/main-cat/Main-cat';
import { mainPath } from '../../utils/constants';
import styles from './main-page.module.css';

const MainPage: React.FC = () => (
  <div className={styles['main-wrapper']}>
    <div className={styles['main-header']}>
      Самый быстрый способ
      <br /> выучить английский язык
    </div>
    <div className={styles['main-text']}>
      Какой? Естественный подход к изучению реального языка. Заходите и
      попробуйте!
    </div>
    <div className={styles['main-button-container']}>
      <Link
        to={mainPath.ebookPage}
        className={`${buttonStyles['main-button']} ${styles.main__button}`}
      >
        Приступить
      </Link>
      <Link
        to={mainPath.statistic}
        className={`${buttonStyles['main-button']} ${styles.main__button}`}
      >
        Узнать больше
      </Link>
    </div>

    <MainCat />
  </div>
);

export { MainPage };
