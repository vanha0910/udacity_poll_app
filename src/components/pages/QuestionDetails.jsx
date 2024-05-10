import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  answerQuestion,
  resetState,
  setAnswer,
} from "../../redux/question/questionsSlice";
import { setUsers } from "../../redux/auth/authenticationSlice";

import { useParams, useNavigate } from "react-router-dom";

import Loader from "../common/Loader";
import Header from "../common/Header";
import {
  formatQuestionWithFullAuthorInfo,
  formatAnsweredQuestion,
} from "../../utils/helper";
import { OPTION_ONE, OPTION_TWO, PATH } from "../../constansts";
import Error from "../common/Error";
import OptionDetails from "../common/OptionDetails";

const QuestionDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { questions, isLoading, error, isAnsweredSuccess } = useSelector(
    (state) => state.questions
  );

  const { users, authedUser } = useSelector((state) => state.authentication);

  const [selectedOption, setOption] = useState(null);
  const question =
    params && questions && questions.find((it) => it.id === params.question_id);

  const questionDetails = formatAnsweredQuestion(
    formatQuestionWithFullAuthorInfo(question, users),
    authedUser && authedUser.id
  );

  const handleAnswer = (option) => {
    setOption(option);
    dispatch(
      answerQuestion({
        authedUser: authedUser && authedUser.id,
        qid: params && params.question_id,
        answer: option,
      })
    );
  };

  useEffect(() => {
    if (isAnsweredSuccess) {
      dispatch(
        setUsers({
          author: authedUser && authedUser.id,
          answer: {
            id: params && params.question_id,
            option: selectedOption,
          },
        })
      );
      dispatch(
        setAnswer({
          id: params && params.question_id,
          user: authedUser && authedUser.id,
          answer: selectedOption,
        })
      );
      navigate(PATH.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnsweredSuccess, selectedOption]);

  useEffect(() => {
    return () => dispatch(resetState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        {error ? <Error msg={error} /> : ""}
        <div className="section">
          <h3 className="center">
            Poll by{" "}
            {questionDetails &&
              questionDetails.author &&
              questionDetails.author.name}
          </h3>
          <div className="image-holder mb-2">
            <img
              src={
                questionDetails &&
                questionDetails.author &&
                questionDetails.author.avatarURL
              }
              alt={
                questionDetails &&
                questionDetails.author &&
                questionDetails.author.name
              }
            />
          </div>
          <h4 className="center">Would you rather </h4>
          <div className="answer-container">
            <OptionDetails
              questionDetails={questionDetails}
              type={OPTION_ONE}
              onSelect={() => handleAnswer(OPTION_ONE)}
            />
            <OptionDetails
              questionDetails={questionDetails}
              type={OPTION_TWO}
              onSelect={() => handleAnswer(OPTION_TWO)}
            />
          </div>
        </div>

        <Loader open={isLoading} />
      </div>
    </>
  );
};

export default QuestionDetails;
