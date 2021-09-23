import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question.js";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function tabDisplayProps(index) {
  console.log("tabDisplayProps index:", index)
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class Dashboard extends Component {
  state = {
    value: 0,
  };
  handleChange = (event, newValue) => {
    this.setState(() => ({
      value: newValue,
    }));
  };

  getQuestions = (answered) => {
    console.log("questions:", this.props.questions)
    return (
      <div>
      <ul className="dashboard-list">
        {this.props.questions.map((question) => (

          <li key={question.id}>
            <Question questionId={question.id} />
          </li>
        ))}
      </ul>
    </div>
    )
  }

  render() {
    const { value } = this.state;
    const { answeredQuestions, unAnsweredQuestions } = this.props;
    let questionsList = unAnsweredQuestions
    if (value === 1) {
      questionsList = answeredQuestions
    }
    console.log("render answeredQuestions:", answeredQuestions)
    console.log("render unAnsweredQuestions:", unAnsweredQuestions)
    const questionDisplay = (
      <div>
      <ul className="dashboard-list">
        {questionsList.map((questionId) => (

          <li key={questionId}>
            <Question questionId={questionId} />
          </li>
        ))}
      </ul>
    </div>
    )

    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            aria-label="questions tabs"
          >
            <Tab label="Unanswered Questions" {...tabDisplayProps(0)} />
            <Tab label="Answered Questions" {...tabDisplayProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {questionDisplay}
        </TabPanel>
        <TabPanel value={value} index={1}>
        {questionDisplay}
        </TabPanel>
      </Box>
    );
  }
}

function getFilteredQuestions (authedUser, questions, answered) {
  const authedUserId = authedUser.id
  return Object.keys(questions).filter((questionId) => {
    const qustion = questions[questionId]
    if (answered) {
      return qustion.optionOne.votes.includes(authedUserId) || qustion.optionTwo.votes.includes(authedUserId)
    } else {
      return !qustion.optionOne.votes.includes(authedUserId) && !qustion.optionTwo.votes.includes(authedUserId)
    }
    
  }).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  )
}


function mapStateToProps({ questions, authedUser }) {
  const answeredQuestions = getFilteredQuestions(authedUser, questions, true)
  const unAnsweredQuestions = getFilteredQuestions(authedUser, questions, false)
  console.log("mapStateToProps answeredQuestions:", answeredQuestions)
  console.log("mapStateToProps unAnsweredQuestions:", unAnsweredQuestions)
  return {
    answeredQuestions,
    unAnsweredQuestions
  };
}

export default connect(mapStateToProps)(Dashboard);
