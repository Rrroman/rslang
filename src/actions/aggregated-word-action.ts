import { Dispatch } from 'react';
import AggregateService, {
  AggregateParamsType,
  filterQuery,
} from '../services/word-aggregate-service';
import { CurrentWordListType } from './word-actions';

export const USER_AGGREGATED_WORD_LOADED = 'USER_AGGREGATED_WORD_LOADED';
export const USER_AGGREGATED_WORD_LOADING = 'USER_AGGREGATED_WORD_LOADING';
export const USER_AGGREGATED_WORD_ERROR = 'USER_AGGREGATED_WORD_ERROR';
export const USER_AGGREGATED_WORD = 'USER_AGGREGATED_WORD';
export const USER_LEARNING_WORD = 'USER_LEARNING_WORD';
export const USER_HARD_WORD = 'USER_HARD_WORD';
export const USER_DELETED_WORD = 'USER_DELETED_WORD';
export const USER_CLEAR_WORD = 'USER_CLEAR_WORD';

export type AggregatedWordListResultType = {
  paginatedResults: Array<CurrentWordListType>;
  totalCount: [
    {
      count: number;
    }
  ];
};
export type UserAggregatedWordLoadedAType = {
  type: string;
  payload: AggregatedWordListResultType;
};

export type UserAggregatedWordRequestAType = {
  type: string;
  payload: '';
};

export type UserAggregatedWordFetchErrAType = {
  type: string;
  payload: string;
};

export type UserAggregatedWordAType = {
  type: string;
  payload: unknown;
};

export type UserWordCountAType = {
  type: string;
  payload: number;
};

export const userAggregatedWordLoaded = (
  value: AggregatedWordListResultType
) => ({
  type: USER_AGGREGATED_WORD_LOADED,
  payload: value,
});

export const userAggregatedWordRequested = () => ({
  type: USER_AGGREGATED_WORD_LOADING,
  payload: '',
});

export const userAggregatedWordFetchErr = (err: string) => ({
  type: USER_AGGREGATED_WORD_ERROR,
  payload: err,
});

export const userAggregatedWord = (value: any) => ({
  type: USER_AGGREGATED_WORD,
  payload: value,
});

export const userLearningWordCount = (value: number) => ({
  type: USER_LEARNING_WORD,
  payload: value,
});

export const userHardWordCount = (value: number) => ({
  type: USER_HARD_WORD,
  payload: value,
});

export const userDeletedWordCount = (value: number) => ({
  type: USER_DELETED_WORD,
  payload: value,
});

export const clearWordStatistic = () => ({
  type: USER_CLEAR_WORD,
  payload: '',
});

export type UserAggregatedWordActionForReducer =
  | UserAggregatedWordLoadedAType
  | UserAggregatedWordRequestAType
  | UserAggregatedWordFetchErrAType
  | UserAggregatedWordAType
  | UserWordCountAType;

export type UserAggregatedWordsActions =
  | UserAggregatedWordActionForReducer
  | typeof getAggregatedWord
  | typeof getAggregatedWord;

const service = new AggregateService();

export const getAggregatedWordsList = (
  params: AggregateParamsType,
  filterType: string
) => (dispatch: Dispatch<UserAggregatedWordActionForReducer>) => {
  dispatch(userAggregatedWordRequested());

  service
    .getAggregatedWordsList(params, filterType)
    .then((data) => {
      dispatch(userAggregatedWordLoaded(data[0]));
      const count = data[0].totalCount[0] ? data[0].totalCount[0].count : 0;
      if (filterType === filterQuery.learnedWordsAndHardWords) {
        dispatch(userLearningWordCount(count));
      } else if (filterType === filterQuery.deletedWord) {
        dispatch(userDeletedWordCount(count));
      } else if (filterType === filterQuery.hardWords) {
        dispatch(userHardWordCount(count));
      }
    })
    .catch((err) => {
      dispatch(clearWordStatistic());
      dispatch(userAggregatedWordFetchErr(err.message));
    });
};

export const getAggregatedWord = (params: {
  wordId: string;
  userId: string;
  token: string;
}) => (dispatch: Dispatch<UserAggregatedWordActionForReducer>) => {
  dispatch(userAggregatedWordRequested());
  service
    .getAggregatedWord(params)
    .then((data) => dispatch(userAggregatedWord(data[0])))
    .catch((err) => dispatch(userAggregatedWordFetchErr(err.message)));
};
