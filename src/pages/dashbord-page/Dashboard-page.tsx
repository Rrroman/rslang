import React from 'react';
import { useSelector } from 'react-redux';
import { DashboardDictionary } from '../../components/dashboard-components/dictonary-block/Dashboard-dictonary';
import DashboardProfile from '../../components/dashboard-components/dashboar-profile/dashboard-profile';
import styles from './dashboard-page.module.css';
import { DashboardGame } from '../../components/dashboard-components/dashboard-game/Dashboard-game';

import { RootStateType } from '../../reducer/root-reducer';
import UserPage from '../auth-page/User-page';
import { DashboardCat } from '../../components/cats-img/dashboard-cat/Dashboard-cat';

const DashboardPage: React.FC = () => {
  const user = useSelector((state: RootStateType) => state.userState);
  return (
    <div className={styles.container}>
      <div className={styles['block-wrapper']}>
        <DashboardDictionary />
      </div>
      <div className={styles['block-wrapper']}>
        {user.isLogin ? <DashboardProfile /> : <UserPage />}
      </div>
      <div className={styles['block-wrapper']}>
        <DashboardGame />
      </div>
      <DashboardCat />
    </div>
  );
};

export { DashboardPage };
