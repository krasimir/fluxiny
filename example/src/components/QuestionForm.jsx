import React from 'react';

export default class QuestionForm extends React.Component {
  constructor() {
    super();
    this.state = { value: null };
  }
  render() {
    return (
      <div>
        <h2>{ this.props.question.question }</h2>
        <form>
          { this._getControls() }
          <div className='controls'>
            <button onClick={ this.props.answer }>Answer</button>
            <button onClick={ this.props.nextQuestion } className='right'>Get new question</button>
          </div>
        </form>
      </div>
    )    
  }
  get value() {
    return this.props.question.type === 'many-of-many' ?
      this.state.value.join(', ') :
      this.state.value;
  }
  _handleInput(e) {
    if (this.props.question.type === 'many-of-many') {
      this.setState({
        value: this.state.value ?
          this.state.value.concat([e.target.value]) :
          [e.target.value]
      });
    } else {
      this.setState({ value: e.target.value });
    }
  }
  _getControls() {
    switch (this.props.question.type) {
      case 'text': 
        return (
          <input 
            type='text'
            ref='input'
            value={ this.state.value }
            onChange={ this._handleInput.bind(this) } />
        );
      break;
      case 'one-of-many':
        return this.props.question.options.map((option, i) => {
          return (
            <div key={ i }>
              <input
                type='radio'
                name='question' 
                value={ option }
                onClick={ this._handleInput.bind(this) } />&nbsp;
              { option }
            </div>
          );
        });
      break;
      case 'many-of-many':
        return this.props.question.options.map((option, i) => {
          return (
            <div key={ i }>
              <input
                type='checkbox'
                value={ option }
                onClick={ this._handleInput.bind(this) } />&nbsp;
              { option }
            </div>
          );
        });
      break;
    };
  }
};

QuestionForm.propTypes = {
  question: React.PropTypes.object.isRequired     
};
