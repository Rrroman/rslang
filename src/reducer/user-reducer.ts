import {
  ERROR_MESSAGE_CLEAR,
  INPUT_EMAIL_CHANGE,
  INPUT_NAME_CHANGE,
  INPUT_PASSWORD_CHANGE,
  LOGIN_PAGE_CHANGE,
  UserType,
  USER_AUTH_ERROR,
  USER_AUTH_OK,
  USER_CREATED,
  USER_CREATE_ERROR,
  USER_CREATE_LOAD,
  USER_LOGOUT,
  USER_FOTO_UPLOAD,
  USER_FOTO_UPDATE,
  USER_LEVEL_UPDATE,
} from '../actions/user-actions';

export type UserState = typeof initialState;

const initialState = {
  user: {
    message: '',
    token: '',
    refreshToken: '',
    userId: '',
    name: '',
    email: '',
    foto64: '',
    level: '',
  },
  uploadFoto64: '',
  inputName: '',
  inputEmail: '',
  inputPassword: '',
  isLogin: false,
  error: [],
  authError: {
    path: '',
    message: '',
  },
  loginPage: true,
  isLoaded: false,
};

const userReducer = (
  state = initialState,
  action: { type: string; payload: UserType }
) => {
  switch (action.type) {
    case USER_CREATED:
      return {
        ...state,
        error: [],
        loginPage: true,
      };
    case INPUT_NAME_CHANGE:
      return { ...state, inputName: action.payload };
    case INPUT_EMAIL_CHANGE:
      return { ...state, inputEmail: action.payload };
    case INPUT_PASSWORD_CHANGE:
      return { ...state, inputPassword: action.payload };
    case USER_CREATE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case USER_AUTH_OK:
      return {
        ...state,
        user: action.payload,
        isLogin: true,
        authError: {
          path: '',
          message: '',
        },
      };
    case USER_AUTH_ERROR:
      return { ...state, authError: action.payload };
    case LOGIN_PAGE_CHANGE:
      return { ...state, loginPage: action.payload };
    case USER_CREATE_LOAD:
      return { ...state, isLoaded: action.payload };
    case USER_LOGOUT:
      return initialState;
    case ERROR_MESSAGE_CLEAR:
      return {
        ...state,
        authError: {
          path: '',
          message: '',
        },
        error: [],
        user: { ...state.user, foto64: '' },
      };
    case USER_FOTO_UPLOAD:
      return {
        ...state,
        user: { ...state.user, foto64: action.payload },
        uploadFoto64: action.payload,
      };
    case USER_LEVEL_UPDATE:
      return {
        ...state,
        user: { ...state.user, level: action.payload },
      };
    case USER_FOTO_UPDATE:
      return {
        ...state,
        user: { ...state.user, foto64: action.payload },
      };
    default:
      return state;
  }
};

export { userReducer };
