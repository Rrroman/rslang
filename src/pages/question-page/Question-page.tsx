import React from 'react';
import { useSelector } from 'react-redux';

import containerStyles from '../auth-page/user-page.module.css';
import { RootStateType } from '../../reducer/root-reducer';

import { EnLevelQuiz } from '../../components/en-level-quiz/En-level-quiz';
import QuizStartPage from '../../components/quiz-start/Quiz-start';
import QuizResultPage from '../../components/quiz-result/Quiz-result';
import { QuizStart } from '../../actions/questions-action';
import { CatTest } from '../../components/cats-img/cat-test/Cat-test';

const QuestionPage: React.FC = () => {
  const isStarted = useSelector(
    (state: RootStateType) => state.questionState.testStart
  );

  return (
    <div className={containerStyles['auth-container']}>
      {isStarted === QuizStart.Start ? <QuizStartPage /> : null}
      {isStarted === QuizStart.Test ? <EnLevelQuiz /> : null}
      {isStarted === QuizStart.Result ? <QuizResultPage /> : null}
      <CatTest />
    </div>
  );
};
export { QuestionPage };
