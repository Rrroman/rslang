import {
  INC_INCORRECT_COUNT,
  GameResultActionsType,
  INC_CORRECT_COUNT,
  INC_CORRECT_COMBO_COUNT,
  SAVE_COMBO_COUNT,
  CLEAR_ALL_GAME_COUNT,
} from '../actions/game-result-actions';

export type GameResultStateType = {
  correctCount: number;
  incorrectCount: number;
  correctCombo: number;
  maxCorrectComboCount: number;
  wordsIdArr: Array<string>;
};
const initialState: GameResultStateType = {
  correctCount: 0,
  incorrectCount: 0,
  correctCombo: 0,
  maxCorrectComboCount: 0,
  wordsIdArr: [],
};
const gameResultReducer = (
  state = initialState,
  action: GameResultActionsType
) => {
  const maxCombo = state.correctCombo;
  switch (action.type) {
    case INC_CORRECT_COUNT:
      return {
        ...state,
        correctCount: state.correctCount + 1,
        wordsIdArr:
          state.wordsIdArr.length === 0
            ? [action.payload]
            : [...state.wordsIdArr, action.payload],
      };
    case INC_INCORRECT_COUNT:
      return {
        ...state,
        incorrectCount: state.incorrectCount + 1,
        wordsIdArr:
          state.wordsIdArr.length === 0
            ? [action.payload]
            : [...state.wordsIdArr, action.payload],
      };
    case INC_CORRECT_COMBO_COUNT:
      return { ...state, correctCombo: state.correctCombo + 1 };
    case SAVE_COMBO_COUNT:
      if (maxCombo > state.maxCorrectComboCount) {
        return { ...state, maxCorrectComboCount: maxCombo, correctCombo: 0 };
      }
      return { ...state, correctCombo: 0 };
    case CLEAR_ALL_GAME_COUNT:
      return initialState;
    default:
      return state;
  }
};

export { gameResultReducer };
