import React from 'react';
import QuestionForm from './QuestionForm.jsx';

export default class Question extends React.Component {
  componentWillMount() {
    this.state = this.props.subscribeToQuestionStore(this.setState.bind(this));
    this.props.subscribeToErrorsStore(this.setState.bind(this));
  }
  render() {
    return <div className='question'>{ this._getContent() }</div>;
  }
  _getContent() {
    if (this._isError) {
      return (
        <div>
          <h3>Ops, something wrong happen ...</h3>
          <p>{ this.state.error.toString() }</p>
          <button onClick={ this.props.tryAgain }>try again</button>
        </div>
      );
    } else {
      return this._isLoading ?
        <h2>Loading. Please wait.</h2> :
        <QuestionForm 
          ref='form'
          question={ this.state.currentQuestion }
          answer={ this._handleAnswer.bind(this) }
          nextQuestion={ this._handleNextQuestion.bind(this) }
        />;
    };
  }
  get _isError() {
    return this.state.error !== undefined && this.state.error !== null;
  }
  get _isLoading() {
    return this.state.currentQuestion === null;
  }
  _handleAnswer(e) {
    e.preventDefault();
    this.props.answerQuestion({
      question: this.state.currentQuestion,
      value: this.refs.form.value
    });
    this.props.tryAgain();
  }
  _handleNextQuestion(e) {
    e.preventDefault();
    this.props.tryAgain();
  }
};

Question.propTypes = {
  subscribeToQuestionStore: React.PropTypes.func.isRequired,
  subscribeToErrorsStore: React.PropTypes.func.isRequired,
  tryAgain: React.PropTypes.func.isRequired,
  answerQuestion: React.PropTypes.func.isRequired
};