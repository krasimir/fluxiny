import React from 'react';
import ReactDOM from 'react-dom';
import Fluxiny from './vendor/fluxiny.min';

import QuestionLoader from './services/QuestionLoader';

import Layout from './components/Layout.jsx';
import Question from './components/Question.jsx';
import Answers from './components/Answers.jsx';

import QuestionsStore from './stores/QuestionsStore';
import ErrorsStore from './stores/ErrorsStore';
import AnswersStore from './stores/AnswersStore';

import {
  QUESTION_REQUEST_PENDING,
  QUESTION_REQUEST_SUCCESS,
  QUESTION_REQUEST_FAIL,
  GET_NEW_QUESTION,
  QUESTION_ANSWERED
} from './constants';

const { createSubscriber, createAction } = Fluxiny.create();

window.onload = () => {

  ReactDOM.render(
    (
      <Layout>
        <Question
          subscribeToQuestionStore={ createSubscriber(QuestionsStore) }
          subscribeToErrorsStore={ createSubscriber(ErrorsStore) }
          tryAgain={ createAction(GET_NEW_QUESTION) }
          answerQuestion={ createAction(QUESTION_ANSWERED) }
        />
        <Answers
          subscribeToAnswersStore={ createSubscriber(AnswersStore) }
        />
      </Layout>
    ),
    document.querySelector('#container')
  );

  let service = new QuestionLoader({
    pending: createAction(QUESTION_REQUEST_PENDING),
    success: createAction(QUESTION_REQUEST_SUCCESS),
    fail: createAction(QUESTION_REQUEST_FAIL)
  });
  createSubscriber({
    update: function (action) {
      if (action.type === GET_NEW_QUESTION) service.request();
    }
  })

};


