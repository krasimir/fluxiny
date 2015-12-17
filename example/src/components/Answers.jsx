import React from 'react';

export default class Answers extends React.Component {
  componentWillMount() {
    this.props.subscribeToAnswersStore(store => {
      this.setState({ answers: store.getAnswers() })
    });
  }
  render() {
    var answers = this.state.answers.map((answer, i) => {
      return (
        <li key={ i }>
          { answer.question.question }
          <small>Answer: { answer.value }</small>
        </li>
      );
    });

    return this.state.answers.length === 0 ? null :
      (
        <div className='answers'>
          <h3>Your answers so far:</h3>
          <ul>
            { answers }
          </ul>
        </div>
      );
  }
};

Answers.propTypes = {
  subscribeToAnswersStore: React.PropTypes.func.isRequired
};
