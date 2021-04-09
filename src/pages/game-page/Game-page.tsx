import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  clearWords,
  constructorGameStart,
  setResultPageState,
} from '../../actions/constructor-game-actions';
import { setLevelVisibility } from '../../actions/menu-actions';
import { gameStartStatusChange } from '../../actions/word-actions';
import { MainCat } from '../../components/cats-img/main-cat/Main-cat';
import { LinkButton } from '../../components/link-button/Link-button';
import { GameStart, mainPath } from '../../utils/constants';
import rootStyles from '../e-book-page/e-book-page.module.css';
import styles from './game-page.module.css';

const GamePage: React.FC = () => {
  const dispatch = useDispatch();

  const openConstructorGameHandler = () => {
    dispatch(constructorGameStart(false));
    dispatch(setResultPageState(false));
    dispatch(clearWords());
    dispatch(setLevelVisibility(true));
  };

  useEffect(() => {
    dispatch(gameStartStatusChange(GameStart.Menu));
  }, []);

  return (
    <div className={rootStyles['ebook-container']}>
      <h2 className={rootStyles.title}>Мини-игры</h2>
      <div className={rootStyles['ebook-buttons-container']}>
        <LinkButton link={mainPath.gamePage} buttonName="Саванна" />
        <LinkButton link={mainPath.gamePage} buttonName="Аудиовызов" />
      </div>
      <div className={rootStyles['ebook-buttons-container']}>
        <LinkButton link={mainPath.sprint} buttonName="Спринт" />
        <button
          className={styles['constructor-button']}
          type="button"
          onClick={() => openConstructorGameHandler()}
        >
          <LinkButton
            link={mainPath.constructorGame}
            buttonName="Конструктор слов"
          />
        </button>
      </div>
      <MainCat />
    </div>
  );
};

export default GamePage;
