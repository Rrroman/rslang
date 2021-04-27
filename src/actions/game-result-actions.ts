import { Dispatch } from 'redux';

export const INC_CORRECT_COUNT = 'INC_CORRECT_COUNT';
export const INC_INCORRECT_COUNT = 'INC_INCORRECT_COUNT';
export const INC_CORRECT_COMBO_COUNT = 'INC_CORRECT_COMBO_COUNT';
export const SAVE_COMBO_COUNT = 'SAVE_COMBO_COUNT';
export const CLEAR_ALL_GAME_COUNT = 'CLEAR_ALL_GAME_COUNT';

export const incCorrectCount = (value: string) => ({
  type: INC_CORRECT_COUNT,
  payload: value,
});

export const incInCorrectCount = (value: string) => ({
  type: INC_INCORRECT_COUNT,
  payload: value,
});

export const incCorrectCombeCount = () => ({
  type: INC_CORRECT_COMBO_COUNT,
  payload: '',
});

export const checkAndSaveMaxCombo = () => ({
  type: SAVE_COMBO_COUNT,
  payload: '',
});

export const clearAllCount = () => ({
  type: CLEAR_ALL_GAME_COUNT,
  payload: '',
});

export type GameResultActionsType = {
  type: string;
  payload: string;
};

export const setWorldResult = (result: boolean, wordId: string) => (
  dispatch: Dispatch<GameResultActionsType>
) => {
  if (result) {
    dispatch(incCorrectCount(wordId));
    dispatch(incCorrectCombeCount());
  } else {
    dispatch(incInCorrectCount(wordId));
    dispatch(checkAndSaveMaxCombo());
  }
};
