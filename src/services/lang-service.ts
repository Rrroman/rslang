import { serverUrl } from '../utils/constants';

export default class LangService {
  getWordList = async (listProps: { page: number; group: number }) => {
    const { page, group } = listProps;
    const res = await fetch(`${serverUrl}words?page=${page}&group=${group}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    });
    const data = await res.json();
    return data;
  };

  getWord = async (wordId: string) => {
    const res = await fetch(`${serverUrl}words/:${wordId}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    });
    const data = await res.json();
    return data;
  };
}
