import React from "react";
import { useSelector } from "react-redux";

import Loader from "../common/Loader";
import Header from "../common/Header";
import { formatQuestionWithFullAuthorInfo } from "../../utils/helper";
import Error from "../common/Error";
import HomeSection from "../common/HomeSection";

const Home = () => {
  const { questions, isLoading, error } = useSelector(
    (state) => state.questions
  );
  const { users, authedUser } = useSelector((state) => state.authentication);

  const answeredQuestions = questions
    .filter((question) => {
      const { optionOne, optionTwo } = question;
      const votedForOptionOne =
        optionOne &&
        optionOne.votes &&
        optionOne.votes.includes(authedUser && authedUser.id);
      const votedForOptionTwo =
        optionTwo &&
        optionTwo.votes &&
        optionTwo.votes.includes(authedUser && authedUser.id);
      return votedForOptionOne || votedForOptionTwo;
    })
    .map((question) => formatQuestionWithFullAuthorInfo(question, users))
    .sort((a, b) => b.timestamp - a.timestamp );

  const unAnsweredQuestions = questions
    .filter(
      (question) =>
        answeredQuestions &&
        !answeredQuestions.map((it) => it.id).includes(question.id)
    )
    .map((question) => formatQuestionWithFullAuthorInfo(question, users))
    .sort((a, b) => b.timestamp - a.timestamp );

  return (
    <>
      <Header />
      <div className="container">
        <h2>Home</h2>
        {error ? <Error msg={error} /> : ""}
        <HomeSection title="New Questions" data={unAnsweredQuestions} />
        <HomeSection title="Done" data={answeredQuestions} />
        <Loader open={isLoading} />
      </div>
    </>
  );
};

export default Home;
