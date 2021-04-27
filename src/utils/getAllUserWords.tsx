/* eslint-disable @typescript-eslint/no-explicit-any */
import UserWordsService from '../services/user-words-service';

const userWordsService = new UserWordsService();

//  fetch all userwords from backend
const getAllUserWords = async (user: any) => {
  try {
    const words = await userWordsService.getWordsList({
      userId: user.userId,
      token: user.token,
    });
    return words;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  return [];
};

export default getAllUserWords;
