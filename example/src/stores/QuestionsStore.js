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
        change(this.data);
      break;
      case QUESTION_REQUEST_SUCCESS:
        this.data.currentQuestion = action.payload;
        this.data.questions.push(action.payload);
        change(this.data);
      break;
      case SURVEY_ENDED:
        this.data.ended = true;
        change(this.data);
      break;
    }    
  },
  getData: function () {
    return this.data;
  }
};
