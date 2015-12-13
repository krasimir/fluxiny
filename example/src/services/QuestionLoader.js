import superagent from 'superagent';

const questions = [
  'A.json',
  'B.json',
  'C.json',
  '!D.json',
  '!E.json'
];

export default class QuestionLoader {
  constructor(actions) {
    this.actions = actions;
    this.request();
  }
  request() {
    var url = this._getQuestionURL();

    this.actions.pending();
    setTimeout(() => {
      superagent
      .get(url)
      .end((err, res) => {
        err ? this.actions.fail(err) : this.actions.success(res.body);
      });
    }, 700);
    
  }
  _getQuestionURL() {
    return './data/' + questions[Math.floor(Math.random() * (questions.length-1 + 1))];
  }
};
