import { serverUrl } from '../utils/constants';

export default class LangService {
  getQuestionsList = async () => {
    const res = await fetch(`${serverUrl}questions`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    });
    const data = await res.json();
    return data;
  };
}
