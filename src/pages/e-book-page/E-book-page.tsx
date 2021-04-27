import React from 'react';
import { useDispatch } from 'react-redux';
import { questionClearAll } from '../../actions/questions-action';
import { MainCat } from '../../components/cats-img/main-cat/Main-cat';
import { LinkButton } from '../../components/link-button/Link-button';
import { mainPath } from '../../utils/constants';
import styles from './e-book-page.module.css';

const EbookPage: React.FC = () => {
  const dispatch = useDispatch();
  const clearQuizParam = () => {
    dispatch(questionClearAll());
  };

  return (
    <div className={styles['ebook-container']}>
      <div className={styles['ebook-buttons-container']}>
        <LinkButton link={mainPath.learnPage} buttonName="Изучение" />
        <LinkButton link={mainPath.dictionaryPage} buttonName="Словарь" />
      </div>
      <div className={styles['ebook-buttons-container']}>
        <div onClick={clearQuizParam} aria-hidden="true">
          <LinkButton
            link={mainPath.questionPage}
            buttonName="Определить уровень"
          />
        </div>
        <LinkButton link={mainPath.gamePage} buttonName="Мини игры" />
      </div>
      <MainCat />
    </div>
  );
};

export default EbookPage;
