import {
  UserAggregatedWordActionForReducer,
  USER_AGGREGATED_WORD,
  USER_AGGREGATED_WORD_ERROR,
  USER_AGGREGATED_WORD_LOADED,
  USER_AGGREGATED_WORD_LOADING,
  USER_DELETED_WORD,
  USER_HARD_WORD,
  USER_LEARNING_WORD,
  USER_CLEAR_WORD,
} from '../actions/aggregated-word-action';

export type AggregatedWordsStateType = typeof initialState;

const initialState = {
  userAggregatedWords: {
    paginatedResults: [],
    totalCount: [],
  },
  loading: false,
  errMsg: '',
  aggregatedWord: [],
  learningWordCount: 0,
  hardWordCount: 0,
  deletedWordCount: 0,
};

const aggregatedWordsReducer = (
  state = initialState,
  action: UserAggregatedWordActionForReducer
) => {
  switch (action.type) {
    case USER_AGGREGATED_WORD_LOADED:
      return {
        ...state,
        userAggregatedWords: action.payload,
        loading: false,
        errMsg: '',
      };
    case USER_AGGREGATED_WORD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_AGGREGATED_WORD_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    case USER_AGGREGATED_WORD:
      return {
        ...state,
        aggregatedWord: action.payload,
      };
    case USER_LEARNING_WORD:
      return {
        ...state,
        learningWordCount: action.payload,
      };
    case USER_HARD_WORD:
      return {
        ...state,
        hardWordCount: action.payload,
      };
    case USER_DELETED_WORD:
      return {
        ...state,
        deletedWordCount: action.payload,
      };
    case USER_CLEAR_WORD:
      return {
        ...state,
        learningWordCount: 0,
        hardWordCount: 0,
        deletedWordCount: 0,
      };
    default:
      return state;
  }
};

export { aggregatedWordsReducer };
