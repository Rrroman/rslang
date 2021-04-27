import { Dispatch } from 'redux';
import UserService from '../services/user-service';
import { authErrorPath } from '../utils/constants';

export const USER_CREATED = 'USER_CREATED';
export const USER_CREATE_LOAD = 'USER_CREATE_LOAD';
export const INPUT_NAME_CHANGE = 'INPUT_NAME_CHANGE';
export const INPUT_EMAIL_CHANGE = 'INPUT_EMAIL_CHANGE';
export const INPUT_PASSWORD_CHANGE = 'INPUT_PASSWORD_CHANGE';
export const USER_CREATE_ERROR = 'USER_CREATE_ERROR';
export const USER_AUTH_ERROR = 'AUTH_ERROR';
export const USER_AUTH_OK = 'USER_AUTH_OK';
export const LOGIN_PAGE_CHANGE = 'LOGIN_PAGE_CHANGE';
export const USER_LOGOUT = 'USER_LOGOUT';
export const ERROR_MESSAGE_CLEAR = 'ERROR_MESSAGE_CLEAR';
export const USER_FOTO_UPLOAD = 'USER_FOTO_UPLOAD';
export const USER_FOTO_UPDATE = 'USER_FOTO_UPDATE';
export const USER_LEVEL_UPDATE = 'USER_LEVEL_UPDATE';

export type UserType = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

export type UserAuthErrType = {
  path: string;
  message: string;
};

export type UserCreateErrorsArrayType = Array<UserAuthErrType>;

export type UserCreatedActionType = {
  type: string;
};

export type UserCreateErrorActionType = {
  type: string;
  payload: UserCreateErrorsArrayType;
};

export type InputActionsType = {
  type: string;
  payload: string;
};

export type UserAuthActionType = {
  type: string;
  payload: UserType;
};

export type UserAuthErrorActionType = {
  type: string;
  payload: UserAuthErrType;
};

export type UserLogOutActionType = {
  type: string;
};

type SaveFromBackDataActions =
  | UserCreatedActionType
  | UserCreateErrorActionType
  | UserAuthActionType
  | UserAuthErrorActionType;

const userCreated = () => ({
  type: USER_CREATED,
});

const userCreatError = (error: UserCreateErrorsArrayType) => ({
  type: USER_CREATE_ERROR,
  payload: error,
});

const userAuthOk = (user: UserType) => ({
  type: USER_AUTH_OK,
  payload: user,
});

const userAuthErr = (error: UserAuthErrType) => ({
  type: USER_AUTH_ERROR,
  payload: error,
});

export const inputNameChange = (value: string) => ({
  type: INPUT_NAME_CHANGE,
  payload: value,
});

export const inputEmailChange = (value: string) => ({
  type: INPUT_EMAIL_CHANGE,
  payload: value,
});

export const inputPasswordChange = (value: string) => ({
  type: INPUT_PASSWORD_CHANGE,
  payload: value,
});

export const loginPageChange = (value: boolean) => ({
  type: LOGIN_PAGE_CHANGE,
  payload: value,
});

export const userDataLoading = (value: boolean) => ({
  type: USER_CREATE_LOAD,
  payload: value,
});

export const userLogOut = () => ({
  type: USER_LOGOUT,
});

export const errorMessageClear = () => ({
  type: ERROR_MESSAGE_CLEAR,
});

export const saveUploadFoto64 = (value: string) => ({
  type: USER_FOTO_UPLOAD,
  payload: value,
});

export const userFotoUpdate = (value: string) => ({
  type: USER_FOTO_UPDATE,
  payload: value,
});

export const userLevelUpdate = (value: string) => ({
  type: USER_LEVEL_UPDATE,
  payload: value,
});

const usersService = new UserService();

const createUser = (params: {
  name: string;
  email: string;
  password: string;
  foto64: string;
}) => (dispatch: Dispatch<SaveFromBackDataActions>) => {
  dispatch(userDataLoading(true));
  usersService
    .createUser(params)
    .then((data) => {
      if (data.error) {
        const errData = data.error.errors.map((err: UserAuthErrType) => {
          if (err.path[0] === authErrorPath.name) {
            return {
              ...err,
              message: 'поле лигин не должно быть пустым',
              path: err.path[0],
            };
          }
          if (err.path[0] === authErrorPath.password) {
            return {
              ...err,
              message: 'длина пароля не менее 8 символов',
              path: err.path[0],
            };
          }
          if (err.path === authErrorPath.email) {
            return {
              ...err,
              message: err.message,
              path: err.path,
            };
          }
          return {
            ...err,
            message:
              'поле email должно быть заполнен в формате электронной почты',
            path: err.path[0],
          };
        });
        dispatch(userCreatError(errData));
      } else {
        dispatch(userCreated());
      }
      dispatch(userDataLoading(false));
    })
    .catch((err) => {
      dispatch(userDataLoading(false));
      console.error('fetch err action user', err);
    });
};

const logIn = (params: { email: string; password: string }) => (
  dispatch: Dispatch<SaveFromBackDataActions>
) => {
  dispatch(userDataLoading(true));
  usersService
    .loginUser(params)
    .then((data) => {
      if (data.error) {
        dispatch(userAuthErr(data.error));
        dispatch(userDataLoading(false));
      } else {
        dispatch(userAuthOk(data));
        dispatch(userDataLoading(false));
      }
    })
    .catch((err) => {
      dispatch(userDataLoading(false));
      console.error('fetch err action user', err);
    });
};

export const updateUser = (params: {
  userId: string;
  token: string;
  body: {
    foto64?: string;
    level?: string;
  };
}) => (dispatch: Dispatch<SaveFromBackDataActions>) => {
  dispatch(userDataLoading(true));
  usersService
    .updateUser(params)
    .then((data) => {
      if (data.error) {
        console.error('error load image');
        dispatch(userDataLoading(false));
      } else {
        dispatch(userFotoUpdate(data.foto64));
        dispatch(userLevelUpdate(data.level));
        dispatch(userDataLoading(false));
      }
    })
    .catch((err) => {
      dispatch(userDataLoading(false));
      console.error('fetch err action user', err);
    });
};

export { createUser, logIn };
