import superagent from 'superagent';

const questions = [
  'A.json',
  'B.json',
  'C.json',
  'D.json',
  'E.json'
];

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
        this.actions.fail('No more questions!');
      } else {
        superagent
          .get(url)
          .end((err, res) => {
            err ? this.actions.fail(err) : this.actions.success(res.body);
          });
      }
    }, 400);
  }
  _getQuestionURL() {
    return './data/' + questions.shift();
  }
};
