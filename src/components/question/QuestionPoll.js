import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { QuestionCard } from "./QuestionCard.js";
import { useParams } from "react-router-dom";

export function QuestionPoll() {
  const { id } = useParams();

  const authedUser = useSelector((state) => state.authedUser);
  const questions = useSelector((state) => state.questions);
  const question = questions[id];
  const questionId = id;
  const questionAnswered = question
    ? questions[id].optionOne.votes.includes(authedUser.id) ||
      questions[id].optionTwo.votes.includes(authedUser.id)
    : false;

  return (
    <Fragment>
      <QuestionCard
        questionId={questionId}
        questionAnswered={questionAnswered}
      />
    </Fragment>
  );
}
