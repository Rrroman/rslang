import { Dispatch } from 'redux';
import moment from 'moment';
import {
  AllGameStatisticType,
  GameStatistic,
  TodayGameStatisticType,
  TodayTotalGamesStatisticType,
  TotalStatisticType,
} from '../reducer/statistic-state-types';
import StatisticService from '../services/statistic-service';
import { gameType } from '../utils/constants';

export const GAME_STAT_UPDATE = 'GAME_STAT_UPDATE';
export const CLEAR_ALL_STATISTIC = 'CLEAR_ALL_STATISTIC';
export const STATISTIC_LOAD_ERROR = 'STATISTIC_LOAD_ERROR';
export const TODAY_SAVANNA_STATISTIC = 'TODAY_SAVANNA_STATISTIC';
export const TODAY_SPRINT_STATISTIC = 'TODAY_SPRINT_STATISTIC';
export const TODAY_AUDIOCALL_STATISTIC = 'TODAY_AUDIOCALL_STATISTIC';
export const TODAY_CONSTRUCTORS_STATISTIC = 'TODAY_CONSTRUCTORS_STATISTIC';
export const TODAY_GAME_STATISTIC = 'TODAY_GAME_STATISTIC';
export const CLEAR_TODAY_STATISTIC = 'CLEAR_TODAY_STATISTIC';
export const CLEAR_TOTAL_STATISTIC = 'CLEAR_TOTAL_STATISTIC';
export const TOTAL_STATISTIC = 'TOTAL_STATISTIC';

export type GameStatActionType = {
  type: string;
  payload:
    | AllGameStatisticType
    | string
    | TodayGameStatisticType
    | TodayTotalGamesStatisticType
    | Array<TotalStatisticType>;
};

export const gameStatUpdate = (value: AllGameStatisticType) => ({
  type: GAME_STAT_UPDATE,
  payload: value,
});

export const getTodayStatisticSavanna = (value: TodayGameStatisticType) => ({
  type: TODAY_SAVANNA_STATISTIC,
  payload: value,
});

export const getTodayStatisticSprint = (value: TodayGameStatisticType) => ({
  type: TODAY_SPRINT_STATISTIC,
  payload: value,
});

export const getTodayStatisticAudiocall = (value: TodayGameStatisticType) => ({
  type: TODAY_AUDIOCALL_STATISTIC,
  payload: value,
});

export const getTodayStatisticConstructors = (
  value: TodayGameStatisticType
) => ({
  type: TODAY_CONSTRUCTORS_STATISTIC,
  payload: value,
});

export const clearAllStatistic = () => ({
  type: CLEAR_ALL_STATISTIC,
  payload: '',
});

export const statisticError = (value: string) => ({
  type: STATISTIC_LOAD_ERROR,
  payload: value,
});

export const clearTodayStatistic = () => ({
  type: CLEAR_TODAY_STATISTIC,
  payload: '',
});

export const totalStatisticAdd = (value: Array<TotalStatisticType>) => ({
  type: TOTAL_STATISTIC,
  payload: value,
});

export const clearTotalStatistic = () => ({
  type: CLEAR_TOTAL_STATISTIC,
  payload: '',
});

export const todayTotalGameStatistic = (
  value: TodayTotalGamesStatisticType
) => ({
  type: TODAY_GAME_STATISTIC,
  payload: value,
});

const services = new StatisticService();

export const getStatistics = (params: { userId: string; token: string }) => (
  dispatch: Dispatch<GameStatActionType>
) => {
  services
    .getStatistic(params)
    .then((data) => {
      if (data.error) {
        dispatch(
          statisticError('ваша сессия истекла пожалуйста авторизуйтесь заново')
        );
      } else {
        dispatch(gameStatUpdate(data.optional.gameStatistic));
      }
    })
    .catch((err) => {
      console.error('fetch err action user', err);
      dispatch(statisticError('проблема с доступом к серверу'));
    });
};

export const setStatistics = (
  params: {
    userId: string;
    token: string;
  },
  body: GameStatistic
) => (dispatch: Dispatch<GameStatActionType>) => {
  const today = moment().startOf('day');
  const todayBody = { ...body, date: moment(today).toDate() };
  if (params.userId === '') {
    localStorage.setItem(body.gameType, JSON.stringify(body));
  } else {
    services
      .setStatistic(params, todayBody)
      .then((data) => {
        if (data.error) {
          dispatch(
            statisticError(
              'ваша сессия истекла пожалуйста авторизуйтесь заново'
            )
          );
        } else {
          dispatch(gameStatUpdate(data.optional.gameStatistic));
        }
      })
      .catch((err) => {
        console.error('fetch err action user', err);
        dispatch(statisticError('проблема с доступом к серверу'));
      });
  }
};

export const getTodayStatistic = (params: {
  userId: string;
  token: string;
}) => (dispatch: Dispatch<GameStatActionType>) => {
  services
    .getTodayStatistic(params)
    .catch((err) => {
      console.error('fetch err action user', err);
      dispatch(statisticError('проблема с доступом к серверу'));
    })
    .then((values) => {
      if (!values) {
        return;
      }
      if (values.error) {
        console.log(values);
        dispatch(
          statisticError('ваша сессия истекла пожалуйста авторизуйтесь заново')
        );
        return;
      }
      let totalWordCountArr: Array<string> = [];
      const sumCorrectAvg: Array<number> = [];
      dispatch(clearTodayStatistic());
      values.forEach((data: TodayGameStatisticType) => {
        let wordCount = 0;
        if (data.wordsCountArr) {
          wordCount = Array.from(new Set(data.wordsCountArr)).length;
          totalWordCountArr = totalWordCountArr.concat(data.wordsCountArr);
          sumCorrectAvg.push(data.correctAvg);
        }

        switch (data.gameType) {
          case gameType.audiocall:
            dispatch(
              getTodayStatisticAudiocall({
                ...data,
                learnedWordCount: wordCount,
              })
            );
            break;
          case gameType.savanna:
            dispatch(
              getTodayStatisticSavanna({
                ...data,
                learnedWordCount: wordCount,
              })
            );
            break;
          case gameType.constructors:
            dispatch(
              getTodayStatisticConstructors({
                ...data,
                learnedWordCount: wordCount,
              })
            );
            break;
          case gameType.sprint:
            dispatch(
              getTodayStatisticSprint({
                ...data,
                learnedWordCount: wordCount,
              })
            );
            break;
          default:
            break;
        }
      });

      const learnedWordCount = Array.from(new Set(totalWordCountArr)).length;
      const correctAvg =
        sumCorrectAvg.length > 0
          ? Math.round(
              sumCorrectAvg.reduce((sum, item) => sum + item) /
                sumCorrectAvg.length
            )
          : 0;
      dispatch(todayTotalGameStatistic({ learnedWordCount, correctAvg }));
      dispatch(statisticError(''));
    });
};

export const getTotalStatistics = (params: {
  userId: string;
  token: string;
}) => (dispatch: Dispatch<GameStatActionType>) => {
  services
    .getTotalStatistic(params)
    .then((data) => {
      if (!data) {
        return;
      }
      if (data.error) {
        dispatch(
          statisticError('ваша сессия истекла пожалуйста авторизуйтесь заново')
        );
        dispatch(clearAllStatistic());
      } else {
        let totalWordCount = 0;
        const totalStat = data.map((item: TotalStatisticType) => {
          const newData = item;
          let wordCount = 0;

          if (item.wordsCountArr) {
            wordCount = Array.from(new Set(item.wordsCountArr)).length;
          }
          totalWordCount += wordCount;
          newData.wordsCount = wordCount;
          newData.totalWordCount = totalWordCount;
          return newData;
        });
        dispatch(totalStatisticAdd(totalStat));
        dispatch(statisticError(''));
      }
    })
    .catch((err) => {
      console.error('fetch err action user', err);
      dispatch(statisticError('проблема с доступом к серверу'));
    });
};
