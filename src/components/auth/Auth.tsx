import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  inputEmailChange,
  createUser,
  inputNameChange,
  inputPasswordChange,
  UserAuthErrType,
  logIn,
  loginPageChange,
  errorMessageClear,
} from '../../actions/user-actions';
import { ImageLoader } from '../image-loader/Image-loader';
import { RootStateType } from '../../reducer/root-reducer';
import styles from './auth.module.css';
import { authErrorPath } from '../../utils/constants';
import { ErrorMessage } from '../error-message/error-message';

type Props = RouteComponentProps;

const Auth: React.FC<Props> = ({ history }) => {
  const auth = useSelector((state: RootStateType) => state.userState);
  const {
    user,
    inputName,
    inputPassword,
    inputEmail,
    isLogin,
    error,
    authError,
    loginPage,
  } = auth;
  const dispatch = useDispatch();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (loginPage) {
      dispatch(logIn({ email: inputEmail, password: inputPassword }));
    } else {
      dispatch(
        createUser({
          name: inputName,
          email: inputEmail,
          password: inputPassword,
          foto64: user.foto64,
        })
      );
    }
  };

  const toSignIn = () => {
    dispatch(errorMessageClear());
    dispatch(loginPageChange(true));
  };

  const toSignUp = () => {
    dispatch(errorMessageClear());
    dispatch(loginPageChange(false));
  };

  return (
    <>
      <h3 className={styles['auth-header']}>
        {loginPage ? 'Авторизация' : 'Регистрация'}
      </h3>
      {loginPage ? null : (
        <div className={styles['profile-img-wrapper']}>
          <ImageLoader />
        </div>
      )}
      <form
        className={styles['auth-form']}
        action="submit"
        onSubmit={handleSubmit}
      >
        {loginPage ? null : (
          <>
            {error.map((item: UserAuthErrType) =>
              item.path === authErrorPath.name ? (
                <ErrorMessage text={item.message} key={`key${item.path}`} />
              ) : null
            )}
            <input
              className={`${styles['auth-input']} ${styles['login-icon']}`}
              type="text"
              value={inputName}
              onChange={(event) =>
                dispatch(inputNameChange(event.target.value))
              }
              required
            />
          </>
        )}
        {error.map((item: UserAuthErrType) =>
          item.path === authErrorPath.email ? (
            <ErrorMessage text={item.message} key={`key${item.path}`} />
          ) : null
        )}
        {authError.path === authErrorPath.email ? (
          <ErrorMessage text={authError.message} />
        ) : null}
        <input
          className={`${styles['auth-input']} ${styles['email-icon']}`}
          type="email"
          value={inputEmail}
          onChange={(event) => dispatch(inputEmailChange(event.target.value))}
          required
        />
        {error.map((item: UserAuthErrType) =>
          item.path === authErrorPath.password ? (
            <ErrorMessage text={item.message} key={`key${item.path}`} />
          ) : null
        )}
        {authError.path === authErrorPath.password ? (
          <ErrorMessage text={authError.message} />
        ) : null}
        <input
          className={`${styles['auth-input']} ${styles['password-icon']}`}
          type="password"
          value={inputPassword}
          onChange={(event) =>
            dispatch(inputPasswordChange(event.target.value))
          }
          required
        />
        {loginPage ? (
          <>
            <input
              type="submit"
              value="Войти"
              className={styles['auth-button']}
            />
          </>
        ) : (
          <input
            type="submit"
            value="Регистрация"
            className={styles['auth-button']}
          />
        )}
      </form>
      {loginPage ? (
        <div>
          <span className={styles['auth-text']}>нет акаунта?&nbsp;</span>
          <span
            className={styles['auth-text-link']}
            onClick={toSignUp}
            aria-hidden="true"
          >
            Регистрация
          </span>
        </div>
      ) : (
        <div className={styles['login-change']}>
          <span className={styles['auth-text']}>Уже есть акаунт?&nbsp;</span>
          <span
            className={styles['auth-text-link']}
            onClick={toSignIn}
            aria-hidden="true"
          >
            Войти
          </span>
        </div>
      )}
    </>
  );
};

export default withRouter(Auth);
