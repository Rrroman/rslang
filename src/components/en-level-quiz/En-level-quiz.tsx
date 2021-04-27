/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { RootStateType } from '../../reducer/root-reducer';
import styles from './en-level-quize.module.css';
import {
  answerAddToArr,
  questionNumberInc,
  testStart,
} from '../../actions/questions-action';
import { MainButton } from '../button-main/Button-main';
import { serverUrl } from '../../utils/constants';
import Spinner from '../Spinner/Spinner';

import { CatPaw } from '../cat-paw/Cat-paw';
import { updateUser } from '../../actions/user-actions';
import { QuizStart } from '../../reducer/question-reducer';

const EnLevelQuiz: React.FC = () => {
  const questionState = useSelector(
    (state: RootStateType) => state.questionState
  );
  const user = useSelector((state: RootStateType) => state.userState.user);

  const { questions, currentQ, loading, answersArr } = questionState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (answersArr.length === 15) {
      checkResult();
    }
  }, [answersArr]);

  const paws: JSX.Element[] = [];
  const renderPaws = () => {
    if (paws.length === currentQ) {
      paws.push(<CatPaw key={`key${currentQ}`} number={currentQ} />);
    } else {
      for (let i = 0; i <= currentQ; i += 1) {
        paws.push(<CatPaw key={`key${i}`} number={i} />);
      }
    }

    return paws;
  };

  const checkResult = () => {
    const result = answersArr.reduce((sum, item) => sum + item, 0);
    let level = '';
    if (result < 4) {
      level = 'A1';
    } else if (result < 7) {
      level = 'A2';
    } else if (result < 10) {
      level = 'A2+';
    } else if (result < 13) {
      level = 'B1';
    } else if (result < 15) {
      level = 'B2';
    } else {
      level = 'B2+';
    }
    const params = {
      userId: user.userId,
      token: user.token,
      body: {
        level,
      },
    };
    dispatch(updateUser(params));
    dispatch(testStart(QuizStart.Result));
  };

  const addAnswerToArr = (value: string) => {
    if (questions[currentQ].correctAnswer === value) {
      dispatch(answerAddToArr(1));
    } else {
      dispatch(answerAddToArr(0));
    }
  };

  const nextQuestion = (value: string) => {
    addAnswerToArr(value);

    if (currentQ === questions.length - 1) {
      return;
    }
    dispatch(questionNumberInc());
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles['paw-container']}>
            {currentQ >= 0 ? renderPaws() : 0}
          </div>
          <div className={styles['quiz-container']}>
            <div className={styles['quiz-block']}>
              {currentQ >= 0 && (
                <Formik
                  initialValues={{
                    picked: '',
                  }}
                  onSubmit={(values) => {
                    if (values.picked !== '') {
                      nextQuestion(values.picked);
                    }
                    // eslint-disable-next-line no-param-reassign
                    values.picked = '';
                  }}
                >
                  {({ values }) => (
                    <Form className={styles['quiz-form']}>
                      <div
                        id="my-radio-group"
                        className={styles['question-text']}
                      >
                        {questions[currentQ].question}
                      </div>
                      <div
                        role="group"
                        aria-labelledby="my-radio-group"
                        className={styles['answer-block']}
                      >
                        <label
                          htmlFor="field0"
                          className={styles['answer-row']}
                        >
                          <Field
                            type="radio"
                            name="picked"
                            value={questions[currentQ].answers[0].answer}
                            id="field0"
                            className={styles['radio-icon']}
                          />
                          <span className={styles['radio-button']} />
                          {questions[currentQ].answers[0].answer}
                        </label>
                        <label
                          htmlFor="field1"
                          className={styles['answer-row']}
                        >
                          <Field
                            type="radio"
                            name="picked"
                            value={questions[currentQ].answers[1].answer}
                            id="field1"
                            className={styles['radio-icon']}
                          />
                          <span className={styles['radio-button']} />
                          {questions[currentQ].answers[1].answer}
                        </label>
                        <label
                          htmlFor="field2"
                          className={styles['answer-row']}
                        >
                          <Field
                            type="radio"
                            name="picked"
                            value={questions[currentQ].answers[2].answer}
                            id="field2"
                            className={styles['radio-icon']}
                          />
                          <span className={styles['radio-button']} />
                          {questions[currentQ].answers[2].answer}
                        </label>
                        <label
                          htmlFor="field3"
                          className={styles['answer-row']}
                        >
                          <Field
                            type="radio"
                            name="picked"
                            value={questions[currentQ].answers[3].answer}
                            id="field3"
                            className={styles['radio-icon']}
                          />
                          <span className={styles['radio-button']} />
                          {questions[currentQ].answers[3].answer}
                        </label>
                      </div>
                      <div className={styles['margin-topbottom__10']}>
                        <MainButton type="submit" text="Далее" />
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
            <div className={styles['image-block']}>
              <img
                className={styles['question-img']}
                src={`${serverUrl}${questions[currentQ].image}`}
                alt="info_image"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { EnLevelQuiz };
