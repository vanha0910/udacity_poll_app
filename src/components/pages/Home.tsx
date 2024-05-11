import React, { useState } from "react";
import { useSelector } from "react-redux";

import Loader from "../common/Loader";
import Header from "../common/Header";
import { formatQuestionWithFullAuthorInfo } from "../../utils/helper";
import Error from "../common/Error";
import HomeSection from "../common/HomeSection";
import { RootState } from "../../redux/store";

const Home = () => {
  const [unAnsweredMode, setUnAnsweredMode] = useState(true);
  const { questions, isLoading, error } = useSelector(
    (state: RootState) => state.questions
  );
  const { users, authedUser } = useSelector((state: RootState) => state.authentication);

  const answeredQuestions = questions
    .filter((question) => {
      const { optionOne, optionTwo } = question;
      const votedForOptionOne =
        optionOne &&
        optionOne.votes &&
        optionOne.votes.includes(authedUser?.id ?? 'UNDEFINE');
      const votedForOptionTwo =
        optionTwo &&
        optionTwo.votes &&
        optionTwo.votes.includes(authedUser?.id?? 'UNDEFINE');
      return votedForOptionOne || votedForOptionTwo;
    })
    .map((question) => formatQuestionWithFullAuthorInfo(question, users))
    .sort((a : any, b: any) => b.timestamp - a.timestamp);

  const unAnsweredQuestions = questions
    .filter(
      (question) =>
        answeredQuestions &&
        !answeredQuestions.map((it) => it.id).includes(question.id)
    )
    .map((question) => formatQuestionWithFullAuthorInfo(question, users))
    .sort((a : any, b: any) => b.timestamp - a.timestamp);

  return (
    <>
      <Header />
      <div className="container">
        <h2>Home</h2>
        {error ? <Error msg={error} /> : ""}
        <div className="toggle-container mb-2">
          <div
            className={`toggle-item ${unAnsweredMode ? "active" : ""}`}
            onClick={() => setUnAnsweredMode(true)}
          >
            Unanswered
          </div>
          <div
            className={`toggle-item ${unAnsweredMode ? "" : "active"}`}
            onClick={() => setUnAnsweredMode(false)}
          >
            Answered
          </div>
        </div>
        {unAnsweredMode ? (
          <HomeSection title="New Questions" data={unAnsweredQuestions} />
        ) : (
          <HomeSection title="Done" data={answeredQuestions} />
        )}

        <Loader open={isLoading} />
      </div>
    </>
  );
};

export default Home;
