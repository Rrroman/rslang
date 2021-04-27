import { CurrentWordListType } from './word-actions';

const AUDIO_GAME_STATUS = 'AUDIO_GAME_STATUS';
const WORD_USER_ANSWER='WORD_USER_ANSWER';
const WORD_RIGHT=' WORD_RIGHT';
const IS_ANSWER_SELECTED='IS_ANSWER_SELECTED';
const CURRENT_PLAY_WORDS='CURRENT_PLAY_WORDS';
const STEP_COUNTER='STEP_COUNTER';
const IS_FULL_SCREEN='IS_FULL_SCREEN';
const IS_PRESS_DONTKNOW='IS_PRESS_DONTKNOW';
const IS_SHOW_RESULTS= 'IS_SHOW_RESULTS';
const UPDATE_WRONG_WORDS='UPDATE_WRONG_WORDS';
const LIST_RIGHT_WORDS='LIST_RIGHT_WORDS';
const CLEAR_WORDS='CLEAR_WORDS';
const ADD_LEARN_WORDS='ADD_LEARN_WORDS';


const clearWords = () => ({
  type: CLEAR_WORDS,
});

const setLearnWords= (value:  string) => ({
  type: ADD_LEARN_WORDS,
  payload: value,
});

const setWrongWords= (value: CurrentWordListType) => ({
  type: UPDATE_WRONG_WORDS,
  payload: value,
});

const listRightWords= (value: CurrentWordListType) => ({
  type: LIST_RIGHT_WORDS,
  payload: value,
});

const isShowResults= (value: boolean) => ({
  type:IS_SHOW_RESULTS,
  payload: value,
});

const isPressDontknow= (value: boolean) => ({
  type:IS_PRESS_DONTKNOW,
  payload: value,
});

const isFullScreen= (value: boolean) => ({
  type:IS_FULL_SCREEN,
  payload: value,
})


const stepCounter= (value: number) => ({
  type: STEP_COUNTER,
  payload: value,
});


const wordRight = (value: CurrentWordListType) => ({
  type: WORD_RIGHT,
  payload: value,
});

const audioGameStart = (value: boolean) => ({
  type: AUDIO_GAME_STATUS,
  payload: value
})

const wordUserAnswer=(value: CurrentWordListType)=>({
  type: WORD_USER_ANSWER,
  payload:value
})

const isAnswerSelected = (value: boolean) => ({
  type: IS_ANSWER_SELECTED,
  payload: value
})

const currentPlayWords = (value: Array<CurrentWordListType>) => ({
  type: CURRENT_PLAY_WORDS,
  payload: value
})



export type AudioGameStartActionType = {
  type: string;
  payload:
  | number
  | boolean
  | string
  | CurrentWordListType
  | Array<CurrentWordListType>
 
};


export { 
  audioGameStart, AUDIO_GAME_STATUS,
  wordUserAnswer, WORD_USER_ANSWER,
  wordRight, WORD_RIGHT,
  isAnswerSelected, IS_ANSWER_SELECTED,
  currentPlayWords, CURRENT_PLAY_WORDS,
  stepCounter, STEP_COUNTER,
  isFullScreen, IS_FULL_SCREEN,
  isPressDontknow, IS_PRESS_DONTKNOW,
  isShowResults,IS_SHOW_RESULTS,
  setWrongWords, UPDATE_WRONG_WORDS,
  listRightWords, LIST_RIGHT_WORDS,  
  clearWords, CLEAR_WORDS,
  setLearnWords, ADD_LEARN_WORDS
}