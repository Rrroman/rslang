import { CurrentWordListType } from './word-actions';

export const SPRINT_GAME_STATUS_CHANGE = 'SPRINT_GAME_STATUS_CHANGE';
export const SPRINT_GAME_TOTAL_POINTS = 'SPRINT_GAME_TOTAL_POINTS';
export const SPRINT_GAME_CURRENT_POINTS = 'SPRINT_GAME_CURRENT_POINTS';
export const SPRINT_GAME_SHUFFLED_ARRAY = 'SPRINT_GAME_SHUFFLED_ARRAY';
export const SPRINT_GAME_RANDOM_ARRAY = 'SPRINT_GAME_RANDOM_ARRAY';
export const SPRINT_GAME_CHECK_POINTS = 'SPRINT_GAME_CHECK_POINTS';
export const SPRINT_GAME_BALLS_COUNTER = 'SPRINT_GAME_BALLS_COUNTER';
export const SPRINT_GAME_LIST_OF_CORRECT_WORDS =
  'SPRINT_GAME_LIST_OF_CORRECT_WORDS';
export const SPRINT_GAME_LIST_OF_INCORRECT_WORDS =
  'SPRINT_GAME_LIST_OF_INCORRECT_WORDS';
export const SPRINT_GAME_LEARNT_WORDS = 'SPRINT_GAME_LEARNT_WORDS';
export const SPRINT_GAME_NOT_LEARNT_WORDS = 'SPRINT_GAME_NOT_LEARNT_WORDS';
export const CLEAR_WORDS = 'CLEAR_WORDS';
export const UPDATE_FULLSCREEN_STATUS = 'UPDATE_FULLSCREEN_STATUS';
export const SPRINT_GAME_WORD_COUNTER = 'SPRINT_GAME_WORD_COUNTER';
export const SPRINT_GAME_CORRECT_ANSWER ='SPRINT_GAME_CORRECT_ANSWER';

export type SprintGameStatusChangeActionType = {
  type: string;
  payload: string;
};
 
export const sprintGameStatusChange = (value: string) => ({
  type: 'SPRINT_GAME_STATUS_CHANGE',
  payload: value,
});

export const sprintGameTotalPoints = (value: number) => ({
  type: 'SPRINT_GAME_TOTAL_POINTS',
  payload: value,
});

export const sprintGameWordCounter = (value: number) => ({
  type: 'SPRINT_GAME_WORD_COUNTER',
  payload: value,
});
export const sprintGameCurrentPoints = (value: number) => ({
  type: 'SPRINT_GAME_CURRENT_POINTS',
  payload: value,
});

export const sprintGameShuffledArray = (value: CurrentWordListType[]) => ({
  type: 'SPRINT_GAME_SHUFFLED_ARRAY',
  payload: value,
});

export const sprintGameRandomArray = (value: number[]) => ({
  type: 'SPRINT_GAME_RANDOM_ARRAY',
  payload: value,
});

export const sprintGameCheckPoints = (value: number) => ({
  type: 'SPRINT_GAME_CHECK_POINTS',
  payload: value,
});

export const sprintGameBallsCounter = (value: number) => ({
  type: 'SPRINT_GAME_BALLS_COUNTER',
  payload: value,
});

export const sprintGameListOfCorrectWords = (value: string) => ({
  type: 'SPRINT_GAME_LIST_OF_CORRECT_WORDS',
  payload: value,
});

export const sprintGameListOfIncorrectWords = (value: string) => ({
  type: 'SPRINT_GAME_LIST_OF_INCORRECT_WORDS',
  payload: value,
});

export const sprintGameSetLearntWords = (value: CurrentWordListType) => ({
  type: 'SPRINT_GAME_LEARNT_WORDS',
  payload: value,
});
export const sprintGameSetNotLearntWords = (value: CurrentWordListType) => ({
  type: 'SPRINT_GAME_NOT_LEARNT_WORDS',
  payload: value,
});

export const clearWords = () => ({
  type: CLEAR_WORDS,
});

export const setFullScreenStatus = (value: boolean) => ({
  type: 'UPDATE_FULLSCREEN_STATUS',
  payload: value,
});

export const setCorrectAnswer = (value: boolean) =>({
  type: 'SPRINT_GAME_CORRECT_ANSWER',
  payload: value,
})