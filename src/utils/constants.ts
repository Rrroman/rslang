export const mainPath = {
  main: '/main',
  gamePage: '/gamepage',
  wordList: '/wordlist',
  auth: '/user',
  sprint: '/sprint',
  ebookPage: '/ebookpage',
  learnPage: '/ebookpage/learn',
  dictionaryPage: '/ebookpage/dictionary',
  profilePAge: '/profile',
  audioGame: '/audiogame',
  savannaGame: '/savannagame',
  serverUrl: 'https://rslang-app.herokuapp.com/',
  constructorGame: '/constructorgame',
  langUrl: 'https://rslang-app.herokuapp.com/',
  questionPage: '/quiz',
  dashboardPage: '/dashboard',
  testStatistic: '/testStatistic',
  statistic: '/statistic',
  aboutUs: '/aboutUs',
  startPage: '/',
};

export const authErrorPath = {
  name: 'name',
  email: 'email',
  password: 'password',
};

export const gameType = {
  savanna: 'savanna',
  audiocall: 'audiocall',
  sprint: 'sprint',
  constructors: 'constructors',
};

export const difficulty = {
  hard: 'hard',
  easy: 'easy',
  deleted: 'deleted',
};

export const gameConstants = {
  amountOfRounds: 10,
};

export const serverUrl = 'https://rslang-app.herokuapp.com/';
export const serverUrlLocal = 'http://localhost:3001/';

// prettier-ignore
export enum GameStart {
  Menu = 'MENU',
  Dictionary = 'DICTIONARY',
  Book = 'BOOK',
  Deleted= 'DELETED'
}
