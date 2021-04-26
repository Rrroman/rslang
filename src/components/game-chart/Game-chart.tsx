import React from 'react';
import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { RootStateType } from '../../reducer/root-reducer';
import styles from './game-chart.module.css';

type Props = {
  game: string;
  gameType: string;
  learnedWordCount?: number;
  combo: number;
  correctAvg: number;
};
export const GameChart: React.FC<Props> = ({
  game,
  gameType,
  learnedWordCount,
  combo,
  correctAvg,
}) => {
  const user = useSelector((state: RootStateType) => state.userState);
  const localData = {
    learnedWordCount,
    combo,
    correctAvg,
  };
  if (localStorage.getItem(gameType) !== null && !user.isLogin) {
    const app = JSON.parse(localStorage.getItem(gameType) as string);
    localData.learnedWordCount = app.wordsId.length;
    localData.combo = app.combo;
    localData.correctAvg = Math.round(
      (app.know * 100) / (app.know + app.dont_know)
    );
  }
  const data = {
    labels: ['Неправильно %', 'Правильно %'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [100 - localData.correctAvg, localData.correctAvg],
        backgroundColor: ['#F945D1', '#45F9A3'],
        borderColor: ['#fff', '#fff'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.chart}>
      <Pie
        data={data}
        legend={{
          position: 'top',
          display: false,
        }}
        options={{
          responsive: true,
          title: {
            display: true,
            text: game,
          },
        }}
      />
      <h4 className={styles.text}>
        Макс. серия правильных слов: {localData.combo}
      </h4>
      <h4 className={styles.text}>
        Cлов изучено: {localData.learnedWordCount}
      </h4>
    </div>
  );
};
