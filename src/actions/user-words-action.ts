import { Dispatch } from 'react';
import UserWordsService from '../services/user-words-service';

export const USER_WORD_LOADED = 'USER_WORD_LOADED';
export const USER_WORD_LOADING = 'USER_WORD_LOADING';
export const USER_WORD_ERROR = 'USER_WORD_ERROR';
export const USER_WORD_REMOVE = 'USER_WORD_REMOVE';
export const USER_WORD_LIST = 'USER_WORD_LIST';

export type UserWord = {
  id: string;
  difficulty: string;
  optional: {
    isDeleted: boolean;
  };
};

export type UserWordLoadedAType = {
  type: string;
  payload: string;
};

export type UserWordRequestAType = {
  type: string;
  payload: '';
};

export type UserWordFetchErrAType = {
  type: string;
  payload: unknown;
};

export type CurrentUserWordLoadedAType = {
  type: string;
  payload: string;
};

export const userWordLoaded = (value: UserWord) => ({
  type: USER_WORD_LOADED,
  payload: value,
});

export const userWordRequested = () => ({
  type: USER_WORD_LOADING,
  payload: '',
});

export const userWordFetchErr = (err: string) => ({
  type: USER_WORD_ERROR,
  payload: err,
});

export const removeUserWordReducer = () => ({
  type: USER_WORD_REMOVE,
  payload: '',
});

export const getUserWordsList = (value: Array<UserWord>) => ({
  type: USER_WORD_LIST,
  payload: value,
});

export type UserWordActionForReducer =
  | UserWordLoadedAType
  | UserWordRequestAType
  | UserWordFetchErrAType
  | UserWordFetchErrAType;

export type UserWordsActions = UserWordActionForReducer | typeof addUserWord;

const service = new UserWordsService();

export const addUserWord = (params: {
  userId: string;
  wordId: string;
  token: string;
  body: {
    difficulty: string;
    optional: {
      isDeleted?: boolean;
    };
  };
}) => (dispatch: Dispatch<UserWordActionForReducer>) => {
  dispatch(userWordRequested());
  service
    .addWord(params)
    .then((data) => dispatch(userWordLoaded(data)))
    .catch((err) => dispatch(userWordFetchErr(err.message)));
};

export const getUserWord = (params: {
  userId: string;
  wordId: string;
  token: string;
}) => (dispatch: Dispatch<UserWordActionForReducer>) => {
  dispatch(userWordRequested());
  service
    .getWord(params)
    .then((data) => dispatch(userWordLoaded(data)))
    .catch((err) => dispatch(userWordFetchErr(err.message)));
};

export const updateUserWord = (params: {
  userId: string;
  wordId: string;
  token: string;
  body: {
    difficulty: string;
    optional: {
      isDeleted?: boolean;
    };
  };
}) => (dispatch: Dispatch<UserWordActionForReducer>) => {
  dispatch(userWordRequested());
  service
    .updateWord(params)
    .then((data) => dispatch(userWordLoaded(data)))
    .catch((err) => dispatch(userWordFetchErr(err.message)));
};

export const removeUserWord = (params: {
  userId: string;
  wordId: string;
  token: string;
}) => (dispatch: Dispatch<UserWordActionForReducer>) => {
  dispatch(userWordRequested());
  service
    .removeWord(params)
    .then()
    .catch((err) => {
      if (err.name === 'SyntaxError') {
        dispatch(removeUserWordReducer());
      } else {
        dispatch(userWordFetchErr(err.message));
      }
    });
};

export const getUserWordList = (params: { userId: string; token: string }) => (
  dispatch: Dispatch<UserWordActionForReducer>
) => {
  dispatch(userWordRequested());
  service
    .getWordsList(params)
    .then((data) => dispatch(getUserWordsList(data)))
    .catch((err) => dispatch(userWordFetchErr(err.message)));
};