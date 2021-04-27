// import { serverUrl, serverUrl } from '../utils/constants';
import { difficulty, serverUrl } from '../utils/constants';

export default class UserWordsService {
  checkErr = (status: number) => {
    if (status === 417) {
      throw new Error('слово уже добавлено в словарь');
    }
    if (status === 404) {
      throw new Error('выбранное слово отсутсвует в вашем списке слов');
    }
    if (status === 401) {
      throw new Error('пожалуйста авторизуйтесь');
    }
    if (status === 400) {
      throw new Error('некорректный запрос');
    }
  };

  addWord = async (
    params: {
      userId: string;
      wordId: string;
      token: string;
    },
    body?: {
      difficulty?: string;
      optional?: {
        learning?: boolean;
        learned?: boolean;
        correctCount?: number;
        inCorrectCount?: number;
      };
    }
  ) => {
    const initialBody = {
      difficulty: body?.difficulty || difficulty.easy,
      optional: {
        learning: body?.optional?.learning || false,
        learned: body?.optional?.learned || false,
        correctCount: body?.optional?.correctCount || 0,
        inCorrectCount: body?.optional?.inCorrectCount || 0,
      },
    };

    const res = await fetch(
      `${serverUrl}users/${params.userId}/words/${params.wordId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(initialBody),
      }
    );

    this.checkErr(res.status);
    const data = await res.json();
    return data;
  };

  getWord = async (params: {
    userId: string;
    wordId: string;
    token: string;
  }) => {
    const res = await fetch(
      `${serverUrl}users/${params.userId}/words/${params.wordId}`,
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

  updateWord = async (
    params: {
      userId: string;
      wordId: string;
      token: string;
    },
    body: {
      difficulty?: string;
      optional?: {
        learning?: boolean;
        learned?: boolean;
        correctCount?: number;
        inCorrectCount?: number;
      };
    }
  ) => {
    const res = await fetch(
      `${serverUrl}users/${params.userId}/words/${params.wordId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (res.status === 404) {
      const data = await this.addWord(params, body);
      return data;
    }
    this.checkErr(res.status);
    const data = await res.json();
    return data;
  };

  updateLearnWord = async (
    params: {
      userId: string;
      wordId: string;
      token: string;
    },
    gameResult: {
      isCorrect: boolean;
    }
  ) => {
    const res = await fetch(
      `${serverUrl}users/${params.userId}/learn/${params.wordId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ optional: gameResult }),
      }
    );
    if (res.status === 404) {
      const initialBody = {
        difficulty: difficulty.easy,
        optional: {
          learning: true,
          learned: gameResult.isCorrect,
          correctCount: gameResult.isCorrect ? 1 : 0,
          inCorrectCount: gameResult.isCorrect ? 0 : 1,
        },
      };
      const data = await this.addWord(params, initialBody);
      return data;
    }
    this.checkErr(res.status);
    const data = await res.json();
    return data;
  };

  removeWord = async (params: {
    userId: string;
    wordId: string;
    token: string;
  }) => {
    const res = await fetch(
      `${serverUrl}users/${params.userId}/words/${params.wordId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    this.checkErr(res.status);

    return null;
  };

  getWordsList = async (params: { userId: string; token: string }) => {
    const res = await fetch(`${serverUrl}users/${params.userId}/words`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${params.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    this.checkErr(res.status);

    const data = await res.json();

    return data;
  };
}
