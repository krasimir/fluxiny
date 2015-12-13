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
        <p>
          Ops, something wrong happen ... 
          <button onClick={ this.props.tryAgain }>try again</button>
        </p>
      );
    } else {
      return this._isLoading ?
        <p>Loading. Please wait.</p> :
        <QuestionForm question={ this.state.currentQuestion } />;
    };
  }
  get _isError() {
    return this.state.error !== undefined && this.state.error !== null;
  }
  get _isLoading() {
    return this.state.currentQuestion === null;
  }
};

Question.propTypes = {
  subscribeToQuestionStore: React.PropTypes.func.isRequired,
  subscribeToErrorsStore: React.PropTypes.func.isRequired,
  tryAgain: React.PropTypes.func.isRequired
};