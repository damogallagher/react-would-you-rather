import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";
class NewQuestion extends Component {
  state = {
    text: "",
    toHome: false
  };

  handleChange = (e) => {
    const text = e.target.value;

    this.setState(() => ({
      text,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { text } = this.state;
    const { dispatch, id } = this.props
    
    dispatch(handleAddQuestion(text, id))
    this.setState(() => ({
      text: "",
      toHome: id ? false : true,
    }));
  };

  render() {
    const { text, toHome } = this.state;
    const questionLeft = 280 - text.length;

    if (toHome === true) {
      console.log("here 1 going to redirect")
      return <Redirect to='/leaderboard' />
    }

    return (
      <div>
        <h3 className="center">Compose new Question</h3>
        <form className="new-question" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Whats happening"
            value={text}
            onChange={this.handleChange}
            className="textarea"
            maxLength={280}
          />
          {questionLeft <= 100 && <div className="question-length">{questionLeft}</div>}
          <button className="btn" type="submit" disabled={text === ""}>Submit</button>
        </form>
      </div>
    );
  }
}

export default connect()(NewQuestion);