import React from 'react';
import { useSelector } from 'react-redux';
import ball2 from '../../../assets/images/ball1.png';
import ball1 from '../../../assets/images/ball2.png';
import ball4 from '../../../assets/images/ball3.png';
import ball3 from '../../../assets/images/ball4.png';
import { RootStateType } from '../../../reducer/root-reducer';
import styles from './balls.module.css';

const Balls: React.FC = () => {
  const ballsCounter = useSelector(
    (state: RootStateType) => state.sprintGameState.ballsCounter
  );
  const ballsArray = [
    { id: '1', src: ball1 },
    { id: '2', src: ball2 },
    { id: '3', src: ball3 },
    { id: '4', src: ball4 },
  ];

  return (
    <ul className={styles.balls__wrapper}>
      {ballsArray.slice(0, ballsCounter).map(({ id, src }) => (
        <li key={id} className={styles.ball}>
          <img src={src} alt="ball" />
        </li>
      ))}
    </ul>
  );
};

export default Balls;
