import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveQuestion, resetState } from "../../redux/question/questionsSlice";
import {  setUsers} from "../../redux/auth/authenticationSlice";
import { useNavigate } from "react-router-dom";

import Input from "../common/Input";
import Button from "../common/Button";
import Loader from "../common/Loader";
import Header from "../common/Header";
import { PATH } from "../../constansts";

const AddQuestion = () => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [hasSubmit, setSubmit] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {  isLoading,  isCreatedSuccess,  addedQuestion} = useSelector((state) => state.questions);
  const { authedUser } = useSelector((state) => state.authentication);

  const handleOptionOneChange = (e) => {
    setOptionOne(e.target.value);
  };

  const handleOptionTwoChange = (e) => {
    setOptionTwo(e.target.value);
  };

  const handleSubmit = (e) => {
    setSubmit(true)
    e.preventDefault();   

    dispatch(saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser &&  authedUser.id
    }));
  };

  useEffect(() => {
    if(isCreatedSuccess) {
      navigate(PATH.HOME)
      dispatch(setUsers({author: authedUser && authedUser.id, question: addedQuestion && addedQuestion.id}))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreatedSuccess, addedQuestion])

  useEffect(() => {
    return () => dispatch(resetState())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <div className="add-question-container">
        <h2>Would you rather</h2>
        <p>Create your own Poll</p>
        <div className="add-question-form">
          <form onSubmit={handleSubmit}>
            <Input
              label="First Option"
              type="text"
              id="optionOne"
              value={optionOne}
              onChange={handleOptionOneChange}
              required
              errorMessage="First option is required"
              data-testid="first-option"
              hasError={hasSubmit && !optionOne}

            />
            <Input
              label="Second Option"
              type="text"
              id="optionTwo"
              value={optionTwo}
              onChange={handleOptionTwoChange}
              required
              errorMessage="Second option is required"
              data-testid="second-option"
              hasError={hasSubmit && !optionTwo}

            />
            <div className="center-div">
            <Button type="submit"   data-testid="form-button">
              Create Question
            </Button>
            </div>
          </form>
        </div>
        <Loader open={isLoading} />
      </div>
    </>
  );
};

export default AddQuestion;
