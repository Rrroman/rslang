import {
  CurrentWordListType,
  GAME_START_TYPE,
  WordActionForReducer,
  WORD_LIST_ERROR,
  WORD_LIST_LOADED,
  WORD_LIST_LOADING,
  WORD_LOADED,
} from '../actions/word-actions';
import { GameStart } from '../utils/constants';

export type WordStateType = {
  currentWordList: Array<CurrentWordListType>;
  currentWord: CurrentWordListType | {};
  loading: boolean;
  fetchErr: null;
  pageNumber: number;
  groupNumber: number;
  gameStart: GameStart;
};

const initialState: WordStateType = {
  currentWordList: [],
  currentWord: {},
  loading: false,
  fetchErr: null,
  pageNumber: 0,
  groupNumber: 0,
  gameStart: GameStart.Menu,
};

const wordReducer = (state = initialState, action: WordActionForReducer) => {
  switch (action.type) {
    case WORD_LIST_LOADED:
      return {
        ...state,
        currentWordList: action.payload,
        loading: false,
      };
    case WORD_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case WORD_LIST_ERROR:
      return {
        ...state,
        fetchErr: action.payload,
      };
    case WORD_LOADED:
      return {
        ...state,
        currentWord: action.payload,
      };
    case GAME_START_TYPE:
      return {
        ...state,
        gameStart: action.payload,
      };

    default:
      return state;
  }
};

export { wordReducer };
