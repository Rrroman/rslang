import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { userLogOut, updateUser } from '../../actions/user-actions';
import { MainCat } from '../../components/cats-img/main-cat/Main-cat';
import { RootStateType } from '../../reducer/root-reducer';
import authStyles from '../../components/auth/auth.module.css';
import pageStyles from '../auth-page/user-page.module.css';
import { mainPath } from '../../utils/constants';
import { ImageLoader } from '../../components/image-loader/Image-loader';

type Props = RouteComponentProps;

const Profile: React.FC<Props> = ({ history }) => {
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
  }, [newFoto]);

  const logOut = () => {
    dispatch(userLogOut());
    history.push(mainPath.auth);
  };
  return (
    <div className={pageStyles['auth-container']}>
      <h3 className={authStyles['auth-header']}>Профиль</h3>
      <div className={authStyles['profile-img-wrapper']}>
        <ImageLoader />
      </div>
      <form className={authStyles['auth-form']} action="submit">
        <input
          className={`${authStyles['auth-input']} ${authStyles['login-icon']}`}
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

        <input
          type="button"
          value="Выйти"
          className={authStyles['auth-button']}
          onClick={logOut}
        />
      </form>

      <MainCat />
    </div>
  );
};

export default withRouter(Profile);
