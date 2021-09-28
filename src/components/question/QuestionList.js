import React, { useState } from "react";
import { useSelector } from "react-redux";
import {QuestionCard} from "./QuestionCard.js";
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
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function QuestionList(props) {  
  const [value, setValue] = useState(0);

  const questions = useSelector((state) => state.questions);
  const authedUser = useSelector((state) => state.authedUser);

  const answeredQuestions = getFilteredQuestions(authedUser, questions, true);
  const unAnsweredQuestions = getFilteredQuestions(authedUser, questions, false);


  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

    let questionsList = unAnsweredQuestions;
    if (value === 1) {
      questionsList = answeredQuestions;
    }

    const questionDisplay = (
      <div>
        <ul className="dashboard-list">
          {questionsList.map((questionId) => (
            <li key={questionId}>
              <QuestionCard questionId={questionId} showPreview={true}/>
            </li>
          ))}
        </ul>
      </div>
    );

    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
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

function getFilteredQuestions(authedUser, questions, answered) {
  const authedUserId = authedUser.id;
  return Object.keys(questions)
    .filter((questionId) => {
      const question = questions[questionId];
      if (answered) {
        return (
          question.optionOne.votes.includes(authedUserId) ||
          question.optionTwo.votes.includes(authedUserId)
        );
      } else {
        return (
          !question.optionOne.votes.includes(authedUserId) &&
          !question.optionTwo.votes.includes(authedUserId)
        );
      }
    })
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
}



