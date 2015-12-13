import React from 'react';
import ReactDOM from 'react-dom';
import Fluxiny from './vendor/fluxiny.min';

import Layout from './components/Layout.jsx';
import Question from './components/Question.jsx';
import QuestionLoader from './services/QuestionLoader';
import QuestionsStore from './stores/QuestionsStore';
import ErrorsStore from './stores/ErrorsStore';

import {
  QUESTION_REQUEST_PENDING,
  QUESTION_REQUEST_SUCCESS,
  QUESTION_REQUEST_FAIL,
  GET_NEW_QUESTION
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


