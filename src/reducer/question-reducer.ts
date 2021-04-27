import {
  ANSWER_ADD,
  QuestionType,
  QUESTION_CLEAR_ALL,
  QUESTION_LIST_ERROR,
  QUESTION_LIST_LOADED,
  QUESTION_LIST_LOADING,
  QUESTION_NUMBER_CHANGE,
  QUESTION_START,
} from '../actions/questions-action';
// prettier-ignore
export enum QuizStart {
  Start = 'START',
  Test = 'TEST',
  Result = 'RESULT'
}

export type QuestionStateType = {
  questions: Array<QuestionType>;
  loading: boolean;
  fetchErr: unknown;
  testStart: QuizStart;
  currentQ: number;
  answersArr: Array<number>;
};

const initialState = {
  questions: [],
  loading: false,
  fetchErr: null,
  testStart: QuizStart.Start,
  currentQ: 0,
  answersArr: [],
};

export const questionReducer = (
  state = initialState,
  action: { type: string; payload: Array<QuestionType> }
) => {
  switch (action.type) {
    case QUESTION_LIST_LOADED:
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };
    case QUESTION_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case QUESTION_LIST_ERROR:
      return {
        ...state,
        fetchErr: action.payload,
      };
    case QUESTION_START:
      return {
        ...state,
        testStart: action.payload,
      };
    case QUESTION_NUMBER_CHANGE:
      return {
        ...state,
        currentQ: state.currentQ + 1,
      };
    case QUESTION_CLEAR_ALL:
      return {
        ...state,
        currentQ: 0,
        fetchErr: null,
        loading: false,
        testStart: QuizStart.Start,
        answersArr: [],
      };
    case ANSWER_ADD:
      return {
        ...state,
        answersArr: [...state.answersArr, action.payload],
      };

    default:
      return state;
  }
};
