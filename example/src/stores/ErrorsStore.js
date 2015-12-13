import {
  QUESTION_REQUEST_SUCCESS,
  QUESTION_REQUEST_FAIL,
  QUESTION_REQUEST_PENDING
} from '../constants';

export default {
  data: {
    error: null
  },
  initial: function () {
    return this.data.error;
  },
  update: function (action, change) {
    if (action.type === QUESTION_REQUEST_FAIL) {
      this.data.error = action.payload;
      change(this.data);
    } else if (
      action.type === QUESTION_REQUEST_SUCCESS ||
      action.type === QUESTION_REQUEST_PENDING
    ) {
      if (this.data.error !== null) {
        this.data.error = null;
        change(this.data);
      }
    }
  }
}