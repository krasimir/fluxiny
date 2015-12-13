import superagent from 'superagent';

const questions = [
  'F.json',
  'A.json',
  'break-it',
  'B.json',
  'G.json',
  'C.json',
  'D.json',
  'E.json'
];
const requestDelay = 600;

export default class QuestionLoader {
  constructor(actions) {
    this.actions = actions;
    this.request();
  }
  request() {
    var url = this._getQuestionURL();

    this.actions.pending();

    // delay so we simulate a remote server request
    setTimeout(() => {
      if (questions.length === 0) {
        this.actions.end();
      } else {
        superagent
          .get(url)
          .end((err, res) => {
            err ? this.actions.fail(err) : this.actions.success(res.body);
          });
      }
    }, requestDelay);
  }
  _getQuestionURL() {
    return './data/' + questions.shift();
  }
};
