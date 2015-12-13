import {
  QUESTION_REQUEST_PENDING,
  QUESTION_REQUEST_SUCCESS
} from '../constants';

export default {
  data: {
    currentQuestion: null,
    questions: []
  },
  initial: function () {
    return this.data;
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
    }    
  }
};
