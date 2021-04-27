import moment from 'moment';
import { serverUrl } from '../utils/constants';
import { GameStatistic } from '../reducer/statistic-state-types';

export default class StatisticService {
  checkErr = (status: number) => {
    if (status === 401) {
      throw new Error('пожалуйста авторизуйтесь');
    }
    if (status === 400) {
      throw new Error('некорректный запрос');
    }
  };

  getStatistic = async (params: { userId: string; token: string }) => {
    const res = await fetch(`${serverUrl}users/${params.userId}/statistics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${params.token}`,
        Accept: 'application/json',
      },
    });
    this.checkErr(res.status);
    const data = await res.json();
    return data;
  };

  setStatistic = async (
    params: {
      userId: string;
      token: string;
    },
    body: GameStatistic
  ) => {
    const bodyFetch = {
      optional: {
        gameStatistic: {
          total: [body],
        },
      },
    };
    const res = await fetch(
      `${serverUrl}users/${params.userId}/statistics/gameadd/${body.gameType}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyFetch),
      }
    );

    if (res.status === 401) {
      return {
        error: {
          errors: [{ message: 'Пользователь не найден' }],
        },
      };
    }
    const data = await res.json();
    return data;
  };

  getTodayStatistic = async (params: { userId: string; token: string }) => {
    const today = moment().startOf('day').format();
    const res = await fetch(
      `${serverUrl}users/${params.userId}/statistics/gamedata/${today}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    if (res.status === 401) {
      return {
        error: {
          errors: [{ message: 'Пользователь не найден' }],
        },
      };
    }
    const data = await res.json();
    return data;
  };

  getTotalStatistic = async (params: { userId: string; token: string }) => {
    const res = await fetch(
      `${serverUrl}users/${params.userId}/statistics/gametotal`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    if (res.status === 401) {
      return {
        error: {
          errors: [{ message: 'Пользователь не найден' }],
        },
      };
    }
    const data = await res.json();
    return data;
  };
}
