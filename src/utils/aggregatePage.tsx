/* eslint-disable @typescript-eslint/no-explicit-any */
import getAllUserWords from './getAllUserWords';
import getWordsPage from './getWordsPage';

type Params = {
  page: number;
  group: number;
  user: any;
};

const aggregatePage = async ({ page, group, user }: Params) => {
  try {
    const wordsPage = await getWordsPage({ page, group });
    const allUserWords = await getAllUserWords(user);
    const updatedWordsList = await wordsPage.map((word: any) => {
      const wordInfo = allUserWords.find(
        (userWord: any) => word.id === userWord.wordId
      );
      return { ...word, userWord: { ...wordInfo } };
    });
    return updatedWordsList;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return [];
  }
};

export default aggregatePage;
