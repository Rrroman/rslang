import {
  UserWordActionForReducer,
  USER_WORD_ERROR,
  USER_WORD_LIST,
  USER_WORD_LOADED,
  USER_WORD_LOADING,
  USER_WORD_REMOVE,
} from '../actions/user-words-action';
import { difficulty } from '../utils/constants';

export type UserWordsStateType = typeof initialState;
const initialState = {
  userWord: {
    id: '',
    difficulty: difficulty.easy,
    optional: {
      learning: false,
      learned: false,
      correctCount: 0,
      inCorrectCount: 0,
    },
  },
  userWordsList: [],
  loading: false,
  errMsg: '',
};

const userWordsReducer = (
  state = initialState,
  action: UserWordActionForReducer
) => {
  switch (action.type) {
    case USER_WORD_LOADED:
      return {
        ...state,
        userWord: action.payload,
        loading: false,
        errMsg: '',
      };
    case USER_WORD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_WORD_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    case USER_WORD_REMOVE:
      return {
        ...state,
        userWord: {
          id: '',
          difficulty: difficulty.easy,
          optional: {
            learning: false,
          },
        },
      };
    case USER_WORD_LIST:
      return {
        ...state,
        userWordsList: action.payload,
      };

    default:
      return state;
  }
};

export { userWordsReducer };
