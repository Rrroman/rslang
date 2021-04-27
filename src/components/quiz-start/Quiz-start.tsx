import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styles from './quiz-start.module.css';
import { RootStateType } from '../../reducer/root-reducer';
import {
  fetchQuestionList,
  QuizStart,
  testStart,
} from '../../actions/questions-action';
import { CatPaw } from '../cat-paw/Cat-paw';
import { MainButton } from '../button-main/Button-main';
import { mainPath } from '../../utils/constants';

type Props = RouteComponentProps;

const QuizStartPage: React.FC<Props> = ({ history }) => {
  const isLogin = useSelector(
    (state: RootStateType) => state.userState.isLogin
  );
  const dispatch = useDispatch();

  const testStartClick = () => {
    dispatch(testStart(QuizStart.Test));
    dispatch(fetchQuestionList());
  };

  const goToAuth = () => {
    history.push(mainPath.auth);
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <h2 className={styles['quiz-header']}>
        ТЕСТ НА ОПРЕДЕЛЕНИЕ
        <br />
        УРОВНЯ АНГЛИЙСКОГО ЯЗЫКА
      </h2>
      {isLogin ? (
        <>
          <div className={styles['quiz-info-container']}>
            <div
              className={`${styles['quiz-info-wrapper']} ${styles['margin-top__30']}`}
            >
              <CatPaw number={0} type="big" />
              <div className={styles['quiz-info']}>
                Тест состоит
                <br />
                из 15 вопросов
              </div>
            </div>
            <div className={styles['quiz-info-wrapper']}>
              <CatPaw number={1} type="big" />
              <div className={styles['quiz-info']}>
                1 вопрос -
                <br />1 правильный ответ
              </div>
            </div>
            <div
              className={`${styles['quiz-info-wrapper']} ${styles['margin-top__30']}`}
            >
              <CatPaw number={2} type="big" />
              <div className={styles['quiz-info']}>
                Без ограничений
                <br />
                по времени
              </div>
            </div>
            <div className={styles['quiz-info-wrapper']}>
              <CatPaw number={3} type="big" />
              <div className={styles['quiz-info']}>
                Правильные ответы -
                <br />в конце теста
              </div>
            </div>
          </div>
          <MainButton
            type="button"
            text="Начать"
            clickOnButton={() => testStartClick()}
          />
          <div className={styles['quiz-time-info']}>
            Среднее время прохождения теста – 7 минут
          </div>
        </>
      ) : (
        <>
          <div className={styles['auth-info-text']}>
            Для прохождения тестирования Вам необходимо авторизоваться
          </div>
          <div className={styles['auth-button-wrapper']}>
            <MainButton
              type="button"
              text="Войти"
              clickOnButton={() => goToAuth()}
            />
          </div>
          <div className={styles['auth-button-wrapper']}>
            <MainButton
              type="button"
              text="Назад"
              clickOnButton={() => goBack()}
            />
          </div>
        </>
      )}
    </>
  );
};
export default withRouter(QuizStartPage);
