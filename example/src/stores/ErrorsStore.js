import {
  QUESTION_REQUEST_SUCCESS,
  QUESTION_REQUEST_FAIL
} from '../constants';

export default {
  data: {
    error: null
  },
  initial: function () {
    return this.data.error;
  },
  update: function (action, change) {
    switch(action.type) {
      case QUESTION_REQUEST_FAIL:
        this.data.error = action.payload;
        change(this.data);
      break;
      case QUESTION_REQUEST_SUCCESS:
        if (this.data.error !== null) {
          this.data.error = null;
          change(this.data);
        }
      break;
    }
  }
}