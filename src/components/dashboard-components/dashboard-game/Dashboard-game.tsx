import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Polar } from 'react-chartjs-2';
import { getTodayStatistic } from '../../../actions/statistic-action';
import { RootStateType } from '../../../reducer/root-reducer';
import { mainPath } from '../../../utils/constants';
import { DashboardButton } from '../dashboard-button/Dashboard-button';
import { DashboardText } from '../dashboard-text/dashboard-text';
import styles from './dashboard-game.module.css';

const DashboardGame: React.FC = () => {
  const user = useSelector((state: RootStateType) => state.userState);
  const todayStat = useSelector(
    (state: RootStateType) => state.statisticState.gameToday
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const params = {
      userId: user.user.userId,
      token: user.user.token,
    };
    if (user.isLogin) {
      dispatch(getTodayStatistic(params));
    }
  }, [dispatch, user]);

  const savanna =
    todayStat.savanna && user.isLogin ? todayStat.savanna.gameCount : 0;
  const sprint =
    todayStat.sprint && user.isLogin ? todayStat.sprint.gameCount : 0;
  const audiocall =
    todayStat.audiocall && user.isLogin ? todayStat.audiocall.gameCount : 0;
  const constructor =
    todayStat.constructors && user.isLogin
      ? todayStat.constructors.gameCount
      : 0;

  const data = {
    labels: ['Саванна', 'Спринт', 'Аудио-Вызов', 'Конструктор'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [savanna, sprint, audiocall, constructor],
        backgroundColor: [
          '#45F9A3',
          'rgb(185, 43, 241)',
          'rgb(228, 241, 43)',
          'rgb(52, 127, 224)',
        ],
        borderColor: ['#fff'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <DashboardText>Сегодня игр</DashboardText>
      <Polar
        data={data}
        legend={{
          position: 'left',
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
        <DashboardButton link={mainPath.gamePage} buttonName="Играть" />
      </div>
    </>
  );
};

export { DashboardGame };
