import { serverUrl } from '../utils/constants';

export type AggregateParamsType = {
  userId: string;
  token: string;
  page: number;
  group?: number;
  wordsPerPage: number;
};

export type FilterType = {
  isDeleted?: boolean;
};

export const filterQuery = {
  deletedWord: 'deleted',
  allWords: 'all',
  hardWords: 'hard',
  easyAndWithoutTypesWords: 'easy',
  learnedWordsAndHardWords: 'learned',
};

export default class AggregateService {
  checkErr = (status: number) => {
    if (status === 417) {
      throw new Error('слово уже добавлено в словарь');
    }
    if (status === 404) {
      throw new Error('сервер не доступен');
    }
    if (status === 401) {
      throw new Error('пожалуйста авторизуйтесь');
    }
    if (status === 400) {
      throw new Error('некорректный запрос');
    }
  };

  getAggregatedWordsList = async (
    params: AggregateParamsType,
    filterType: string
  ) => {
    let group = 'group=0&';
    let filter = '';
    let wordsPerPage = '';
    if (params.group) {
      group = `group=${params.group}&`;
    }
    if (params.wordsPerPage) {
      wordsPerPage = `&wordsPerPage=${params.wordsPerPage}`;
    }
    switch (filterType) {
      case filterQuery.allWords:
        filter =
          '{"$or":[{"userWord.difficulty":"hard"},{"userWord.difficulty":"easy"},{"userWord.difficulty":"deleted"},{"userWord":null}]}';
        break;
      case filterQuery.deletedWord:
        filter = '{"userWord.difficulty":"deleted"}';
        break;
      case filterQuery.easyAndWithoutTypesWords:
        filter = '{"$or":[{"userWord.difficulty":"easy"},{"userWord":null}]}';
        break;
      case filterQuery.hardWords:
        filter = '{"userWord.difficulty":"hard"}';
        break;
      case filterQuery.learnedWordsAndHardWords:
        filter =
          '{"$and":[{"$or":[{"userWord.difficulty":"hard"},{"userWord.optional.learning":true}]},{"userWord.difficulty":{"$ne":"deleted"}}]}';

        break;
      case 'learning':
        filter = '{"userWord.optional.learning":true}';
        break;
      default:
        break;
    }

    const res = await fetch(
      `${serverUrl}users/${params.userId}/aggregatedWords?${group}page=${params.page}${wordsPerPage}&filter=${filter}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    this.checkErr(res.status);

    const data = await res.json();

    return data;
  };

  getAggregatedWord = async (params: {
    wordId: string;
    userId: string;
    token: string;
  }) => {
    const { userId, wordId, token } = params;
    const res = await fetch(
      `${serverUrl}users/:${userId}/aggregatedWords/:${wordId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    this.checkErr(res.status);

    const data = await res.json();
    return data;
  };
}
