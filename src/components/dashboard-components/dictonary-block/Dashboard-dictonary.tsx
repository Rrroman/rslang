import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getAggregatedWordsList } from '../../../actions/aggregated-word-action';
import { RootStateType } from '../../../reducer/root-reducer';
import { filterQuery } from '../../../services/word-aggregate-service';
import { mainPath } from '../../../utils/constants';
import { DashboardButton } from '../dashboard-button/Dashboard-button';
import { DashboardText } from '../dashboard-text/dashboard-text';
import styles from './dashboard-dictonary.module.css';

const DashboardDictionary: React.FC = () => {
  const user = useSelector((state: RootStateType) => state.userState);
  const totalStat = useSelector(
    (state: RootStateType) => state.aggregatedWordsState
  );

  const learned = totalStat.learningWordCount ? totalStat.learningWordCount : 0;
  const deleted = totalStat.deletedWordCount ? totalStat.deletedWordCount : 0;
  const hard = totalStat.hardWordCount ? totalStat.hardWordCount : 0;
  const dispatch = useDispatch();
  useEffect(() => {
    const params = {
      userId: user.user.userId,
      token: user.user.token,
      page: 0,
      group: -1,
      wordsPerPage: 20,
    };
    // if (user.isLogin) {
    dispatch(
      getAggregatedWordsList(params, filterQuery.learnedWordsAndHardWords)
    );
    dispatch(getAggregatedWordsList(params, filterQuery.deletedWord));
    dispatch(getAggregatedWordsList(params, filterQuery.hardWords));
    // }
  }, [dispatch, user]);

  const data = {
    labels: ['Изучаемые', 'Сложные', 'Удаленные'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [learned, hard, deleted],
        backgroundColor: ['#45F9A3', '#F945D1', '#C6D8E7'],
        borderColor: ['#fff', '#fff', '#fff'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <DashboardText>Учебник 3600 слов</DashboardText>
      <DashboardText>Cловарь {learned + hard + deleted} слов</DashboardText>
      <Doughnut
        data={data}
        legend={{
          position: 'top',
          display: true,
          labels: {
            fontSize: 16,
            fontColor: '#733999',
          },
        }}
        options={{
          responsive: true,
        }}
      />

      <div className={styles['button-margin']}>
        <DashboardButton link={mainPath.ebookPage} buttonName="Изучать" />
      </div>
    </>
  );
};

export { DashboardDictionary };
