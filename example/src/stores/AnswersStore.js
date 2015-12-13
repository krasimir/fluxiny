import {
  QUESTION_ANSWERED
} from '../constants';

export default {
  data: {
    answers: []
  },
  initial: function () {
    return this.data;
  },
  update: function (action, change) {
    if (action.type === QUESTION_ANSWERED) {
      this.data.answers.push(action.payload);
      change(this.data);
    }
  }
}