import React from 'react';

export default class QuestionForm extends React.Component {
  render() {
    switch (this.props.question.type) {

    };
    console.log(this.props.question);
    return <p>hello</p>;
  }
};

QuestionForm.propTypes = {
  question: React.PropTypes.object.isRequired     
};
