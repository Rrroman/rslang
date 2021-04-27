import { CurrentWordListType } from './word-actions';

const CONSTRUCTOR_GAME_RESULT_STATUS = 'CONSTRUCTOR_GAME_RESULT_STATUS';
const CONSTRUCTOR_GAME_PLAY_STATUS = 'CONSTRUCTOR_GAME_PLAY_STATUS';
const CONSTRUCTOR_SHUFFLED_LIST = 'CONSTRUCTOR_GAME_SHUFFLED_LIST';
const UPDATE_CORRECT_WORD_STATUS = 'UPDATE_CORRECT_WORD_STATUS';
const CONSTRUCTOR_ROUND_STATUS = 'CONSTRUCTOR_ROUND_STATUS';
const UPDATE_FULLSCREEN_STATUS = 'UPDATE_FULLSCREEN_STATUS';
const UPDATE_CHARS_POSITION = 'UPDATE_CHARS_POSITION';
const UPDATE_LEARNED_COUNT = 'UPDATE_LEARNED_COUNT';
const ADD_NOT_LEARNED_WORD = 'ADD_NOT_LEARNED_WORD';
const UPDATE_COMBO_COUNTER = 'UPDATE_COMBO_COUNTER';
const UPDATE_ROUND_COUNT = 'UPDATE_ROUND_COUNT';
const UPDATE_COMBO_ARRAY = 'UPDATE_COMBO_ARRAY';
const ADD_USED_WORDS_IDS = 'ADD_USED_WORDS_IDS';
const RESET_COMBO_COUNTER = 'RESET_COMBO_COUNTER';
const ADD_LEARNED_WORD = 'ADD_LEARNED_WORD';
const UPDATE_WORD_OBJ = 'UPDATE_WORD_OBJ';
const CLEAR_WORDS_IDS = 'CLEAR_WORDS_IDS';
const RESET_COMBO = 'RESET_COMBO';
const CLEAR_WORDS = 'CLEAR_WORDS';

const clearWordsIds = () => ({
  type: CLEAR_WORDS_IDS,
});

const setUsedWordsIds = (value: string) => ({
  type: ADD_USED_WORDS_IDS,
  payload: value,
});

const setWordCorrectness = (value: boolean) => ({
  type: UPDATE_CORRECT_WORD_STATUS,
  payload: value,
});

const setFullScreenStatus = (value: boolean) => ({
  type: UPDATE_FULLSCREEN_STATUS,
  payload: value,
});

const setComboArray = (value: number) => ({
  type: UPDATE_COMBO_ARRAY,
  payload: value,
});

const resetCombo = () => ({
  type: RESET_COMBO,
});
const resetComboCounter = () => ({
  type: RESET_COMBO_COUNTER,
});

const setComboCounter = (value: number) => ({
  type: UPDATE_COMBO_COUNTER,
  payload: value,
});

const clearWords = () => ({
  type: CLEAR_WORDS,
});

const addLearnedWord = (value: CurrentWordListType) => ({
  type: ADD_LEARNED_WORD,
  payload: value,
});

const addNotLearnedWord = (value: CurrentWordListType) => ({
  type: ADD_NOT_LEARNED_WORD,
  payload: value,
});

const setResultPageState = (value: boolean) => ({
  type: CONSTRUCTOR_GAME_RESULT_STATUS,
  payload: value,
});

const setLearnCount = (value: number) => ({
  type: UPDATE_LEARNED_COUNT,
  payload: value,
});

const setWordObj = (value: CurrentWordListType) => ({
  type: UPDATE_WORD_OBJ,
  payload: value,
});

const setRoundCount = (value: number) => ({
  type: UPDATE_ROUND_COUNT,
  payload: value,
});

const updateCharsPosition = (value: [string, string][]) => ({
  type: UPDATE_CHARS_POSITION,
  payload: value,
});

const setRoundEnd = (value: boolean) => ({
  type: CONSTRUCTOR_ROUND_STATUS,
  payload: value,
});

const constructorGameStart = (value: boolean) => ({
  type: CONSTRUCTOR_GAME_PLAY_STATUS,
  payload: value,
});

const setShuffledWordList = (value: Array<CurrentWordListType>) => ({
  type: CONSTRUCTOR_SHUFFLED_LIST,
  payload: value,
});

export type ConstructorGameActionType = {
  type: string;
  payload:
    | boolean
    | Array<CurrentWordListType>
    | [string, string][]
    | number
    | CurrentWordListType
    | Array<string>
    | string;
};

export {
  constructorGameStart,
  setShuffledWordList,
  updateCharsPosition,
  setFullScreenStatus,
  setResultPageState,
  setWordCorrectness,
  addNotLearnedWord,
  resetComboCounter,
  setUsedWordsIds,
  setComboCounter,
  addLearnedWord,
  setLearnCount,
  setRoundCount,
  setComboArray,
  clearWordsIds,
  setRoundEnd,
  setWordObj,
  clearWords,
  resetCombo,
  CONSTRUCTOR_GAME_RESULT_STATUS,
  CONSTRUCTOR_GAME_PLAY_STATUS,
  UPDATE_CORRECT_WORD_STATUS,
  CONSTRUCTOR_SHUFFLED_LIST,
  CONSTRUCTOR_ROUND_STATUS,
  UPDATE_FULLSCREEN_STATUS,
  UPDATE_CHARS_POSITION,
  ADD_NOT_LEARNED_WORD,
  UPDATE_LEARNED_COUNT,
  UPDATE_COMBO_COUNTER,
  RESET_COMBO_COUNTER,
  UPDATE_ROUND_COUNT,
  UPDATE_COMBO_ARRAY,
  ADD_USED_WORDS_IDS,
  ADD_LEARNED_WORD,
  UPDATE_WORD_OBJ,
  CLEAR_WORDS_IDS,
  RESET_COMBO,
  CLEAR_WORDS,
};
