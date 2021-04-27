import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styles from './quiz-result.module.css';
import { RootStateType } from '../../reducer/root-reducer';
import { CatPaw } from '../cat-paw/Cat-paw';
import trophyImg from '../../assets/images/trophy.svg';
import { MainButton } from '../button-main/Button-main';
import { mainPath } from '../../utils/constants';
import { questionClearAll } from '../../actions/questions-action';

type Props = RouteComponentProps;

const QuizResultPage: React.FC<Props> = ({ history }) => {
  const level = useSelector(
    (state: RootStateType) => state.userState.user.level
  );
  const answerArr = useSelector(
    (state: RootStateType) => state.questionState.answersArr
  );
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(questionClearAll());
    },
    [dispatch]
  );

  const toVoc = () => {
    history.push(mainPath.ebookPage);
    dispatch(questionClearAll());
  };

  const pawResult = () => {
    let key = 0;
    return answerArr.map((item, index) => {
      key += 1;
      if (item === 0) {
        return <CatPaw number={index} type="small-black" key={`key${key}`} />;
      }
      return <CatPaw number={index} key={`key${key}`} />;
    });
  };

  return (
    <>
      <div className={styles['paw-container']}>{pawResult()}</div>
      <h2 className={styles['result-header']}>Результат</h2>

      <img src={trophyImg} alt="tropphy" className={styles['result-img']} />

      <h2 className={styles['result-header']}>Ваш уровень &nbsp; {level}</h2>

      <div className={styles['result-add-info']}>
        Обратите внимание! <br />
        Результаты онлайн-теста приблизительны <br />и не отражают всей полноты
        ваших знаний.
      </div>
      <div className={styles['button-wrapper']}>
        <MainButton text="Тренировать" type="button" clickOnButton={toVoc} />
      </div>
    </>
  );
};
export default withRouter(QuizResultPage);
