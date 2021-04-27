import { Dispatch } from 'react';
import QuestionService from '../services/questions-service';

export const QUESTION_LIST_LOADED = 'QUESTION_LIST_LOADED';
export const QUESTION_LIST_LOADING = 'QUESTION_LIST_LOADING';
export const QUESTION_LIST_ERROR = 'QUESTION_LIST_ERROR';
export const QUESTION_START = 'QUESTION_START';
export const QUESTION_NUMBER_CHANGE = 'QUESTION_NUMBER_CHANGE';
export const QUESTION_CLEAR_ALL = 'QUESTION_CLEAR_ALL';
export const ANSWER_ADD = 'ANSWER_ADD';

export type QuestionType = {
  question: string;
  answers: [
    {
      answer: string;
      isCorrect: boolean;
    },
    {
      answer: string;
      isCorrect: boolean;
    },
    {
      answer: string;
      isCorrect: boolean;
    },
    {
      answer: string;
      isCorrect: boolean;
    }
  ];
  image: string;
  correctAnswer: string;
};

// prettier-ignore
export enum QuizStart {
  Start = 'START',
  Test = 'TEST',
  Result = 'RESULT'
}

export type QuestionListLoadedAType = {
  type: string;
  payload: Array<QuestionType>;
};

export type QuestionListRequestAType = {
  type: string;
};

export type QuestionListFetchErrAType = {
  type: string;
  payload: unknown;
};

export type TestStartAType = {
  type: string;
  payload: boolean;
};

export const questionsLoaded = (questionList: Array<QuestionType>) => ({
  type: QUESTION_LIST_LOADED,
  payload: questionList,
});

export const questionListRequested = () => ({
  type: QUESTION_LIST_LOADING,
});

export const questionListFetchErr = (err: unknown) => ({
  type: QUESTION_LIST_ERROR,
  payload: err,
});

export const testStart = (value: QuizStart) => ({
  type: QUESTION_START,
  payload: value,
});

export const questionNumberInc = () => ({
  type: QUESTION_NUMBER_CHANGE,
});

export const questionClearAll = () => ({
  type: QUESTION_CLEAR_ALL,
});

export const answerAddToArr = (value: number) => ({
  type: ANSWER_ADD,
  payload: value,
});

export type QuestionActions =
  | QuestionListLoadedAType
  | QuestionListRequestAType
  | QuestionListFetchErrAType
  | typeof fetchQuestionList;

const service = new QuestionService();

export const fetchQuestionList = () => (
  dispatch: Dispatch<QuestionActions>
) => {
  dispatch(questionListRequested());
  service
    .getQuestionsList()
    .then((data) => dispatch(questionsLoaded(data)))
    .catch((err) => dispatch(questionListFetchErr(err)));
};
