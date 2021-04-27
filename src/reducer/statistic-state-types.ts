export type GameStatistic = {
  _id?: string;
  date?: Date | moment.Moment;
  gameType: string;
  know: number;
  dont_know: number;
  combo: number;
  wordsId: Array<string>;
};

export type TodayGameStatisticType = {
  correctAvg: number;
  gameCount: number;
  gameType: string;
  maxCombo: number;
  wordsCountArr: Array<string>;
  learnedWordCount?: number;
};

export type TodayTotalGamesStatisticType = {
  learnedWordCount: number;
  correctAvg: number;
};

export type TotalStatisticType = {
  date: Date;
  wordsCountArr: Array<string>;
  wordsCount?: number;
  totalWordCount?: number;
};

export type AllGameStatisticType = {
  savanna?: {
    total: Array<GameStatistic>;
  };
  sprint?: {
    total: Array<GameStatistic>;
  };
  audiocall?: {
    total: Array<GameStatistic>;
  };
  constructors?: {
    total: Array<GameStatistic>;
  };
};
