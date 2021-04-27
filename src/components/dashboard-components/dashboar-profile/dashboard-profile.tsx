import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { userLogOut, updateUser } from '../../../actions/user-actions';
import { RootStateType } from '../../../reducer/root-reducer';
import authStyles from '../../auth/auth.module.css';
import { mainPath } from '../../../utils/constants';
import { ImageLoader } from '../../image-loader/Image-loader';
import { DashboardText } from '../dashboard-text/dashboard-text';
import styles from './dashboard-profile.module.css';
import { DashboardButton } from '../dashboard-button/Dashboard-button';
import { clearAllStatistic } from '../../../actions/statistic-action';

type Props = RouteComponentProps;

const DashboardProfile: React.FC<Props> = ({ history }) => {
  const user = useSelector((state: RootStateType) => state.userState.user);
  const newFoto = useSelector(
    (state: RootStateType) => state.userState.uploadFoto64
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (newFoto === '') {
      return;
    }
    dispatch(
      updateUser({
        userId: user.userId,
        token: user.token,
        body: {
          foto64: newFoto,
        },
      })
    );
  }, [dispatch, newFoto, user.token, user.userId]);

  const logOut = () => {
    dispatch(userLogOut());
    dispatch(clearAllStatistic());
  };
  return (
    <>
      <DashboardText>Мои данные</DashboardText>

      <div className={authStyles['profile-img-wrapper']}>
        <ImageLoader />
      </div>
      <input
        className={`${styles['user-info']} ${authStyles['login-icon']}`}
        type="text"
        value={user.name}
        readOnly
      />

      <input
        className={`${authStyles['auth-input']} ${authStyles['email-icon']}`}
        type="email"
        value={user.email}
        readOnly
      />

      {!user.level ? (
        <div className={styles['margin-top_20']}>
          <DashboardButton
            link={mainPath.questionPage}
            buttonName="Определить уровень"
          />
        </div>
      ) : (
        <DashboardText>Мой уровень {user.level}</DashboardText>
      )}
      <input
        type="button"
        value="Выйти"
        className={authStyles['auth-button']}
        onClick={logOut}
      />
    </>
  );
};

export default withRouter(DashboardProfile);
