import {
  QUESTION_ANSWERED
} from '../constants';

export default {
  data: {
    answers: []
  },
  update: function (action, change) {
    if (action.type === QUESTION_ANSWERED) {
      this.data.answers.push(action.payload);
      change();
    }
  },
  getAnswers: function () {
    return this.data.answers;
  }
}