import {
  SprintGameStatusChangeActionType,
  SPRINT_GAME_CURRENT_POINTS,
  SPRINT_GAME_RANDOM_ARRAY,
  SPRINT_GAME_SHUFFLED_ARRAY,
  SPRINT_GAME_STATUS_CHANGE,
  SPRINT_GAME_TOTAL_POINTS,
  SPRINT_GAME_CHECK_POINTS,
  SPRINT_GAME_BALLS_COUNTER,
  SPRINT_GAME_LEARNT_WORDS,
  SPRINT_GAME_WORD_COUNTER,
  CLEAR_WORDS,
  SPRINT_GAME_CORRECT_ANSWER,
  SPRINT_GAME_NOT_LEARNT_WORDS,
  UPDATE_FULLSCREEN_STATUS,
} from '../actions/sprint-game-action';
import { CurrentWordListType } from '../actions/word-actions';

export type SprintGameStateType = {
  gameStatus: string;
  shuffledArray: CurrentWordListType[];
  randomArray: number[];
  wordCounter: number;
  totalPoints: number;
  currentPoints: number;
  ballsCounter: number;
  checkpoints: number;
  isFullScreen: boolean;
  correctAnswer: boolean;
  learntWords: CurrentWordListType[];
  notLearntWords: CurrentWordListType[];
};

const initialState = {
  gameStatus: 'start',
  shuffledArray: [],
  randomArray: [],
  wordCounter: 0,
  totalPoints: 0,
  currentPoints: 50,
  ballsCounter: 0,
  checkpoints: 0,
  isFullScreen: false,
  correctAnswer: true,
  learntWords: [],
  notLearntWords: [],
};

export const sprintGameReducer = (
  state = initialState,
  action: SprintGameStatusChangeActionType
) => {
  switch (action.type) {
    case SPRINT_GAME_STATUS_CHANGE:
      return { ...state, gameStatus: action.payload };
    case SPRINT_GAME_TOTAL_POINTS:
      return { ...state, totalPoints: action.payload };
    case SPRINT_GAME_SHUFFLED_ARRAY:
      return { ...state, shuffledArray: action.payload };
    case SPRINT_GAME_CURRENT_POINTS:
      return { ...state, currentPoints: action.payload };
    case SPRINT_GAME_RANDOM_ARRAY:
      return { ...state, randomArray: action.payload };
    case SPRINT_GAME_CHECK_POINTS:
      return { ...state, checkpoints: action.payload };
    case SPRINT_GAME_BALLS_COUNTER:
      return { ...state, ballsCounter: action.payload };
    case SPRINT_GAME_WORD_COUNTER:
      return { ...state, wordCounter: action.payload };
    case SPRINT_GAME_CORRECT_ANSWER:
      return { ...state, correctAnswer: action.payload };
    case SPRINT_GAME_LEARNT_WORDS:
      return {
        ...state,
        learntWords: [...state.learntWords, action.payload],
      };
    case SPRINT_GAME_NOT_LEARNT_WORDS:
      return {
        ...state,
        notLearntWords: [...state.notLearntWords, action.payload],
      };
    case UPDATE_FULLSCREEN_STATUS:
      return {
        ...state,
        isFullScreen: action.payload,
      };
    case CLEAR_WORDS:
      return {
        ...state,
        notLearntWords: [],
        learntWords: [],
      };
    default:
      return state;
  }
};
