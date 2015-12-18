import {
  QUESTION_REQUEST_PENDING,
  QUESTION_REQUEST_SUCCESS,
  SURVEY_ENDED
} from '../constants';

export default {
  data: {
    currentQuestion: null,
    questions: [],
    ended: false
  },
  update: function (action, change) {
    switch (action.type) {
      case QUESTION_REQUEST_PENDING:
        this.data.currentQuestion = null;
        change();
      break;
      case QUESTION_REQUEST_SUCCESS:
        this.data.currentQuestion = action.payload;
        this.data.questions.push(action.payload);
        change();
      break;
      case SURVEY_ENDED:
        this.data.ended = true;
        change();
      break;
    }    
  },
  getData: function () {
    return this.data;
  }
};
