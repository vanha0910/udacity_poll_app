import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  setAuthedUser,
} from "../../redux/auth/authenticationSlice";

import { fetchQuestions } from "../../redux/question/questionsSlice";

import Input from "../common/Input";
import Button from "../common/Button";
import Logo from "../../assets/img/teams.jpeg";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";
import { PATH, SAVED_PATH } from "../../constansts";
import Error from "../common/Error";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasSubmit, setSubmit] = useState(false)
  const [hasError, setError] = useState(false)

  const dispatch = useDispatch();
  const { isLoading: authenLoading, users, authedUser , error} = useSelector(
    (state) => state.authentication
  );
  const { isLoading : questionLoading, questions  } = useSelector(
    (state) => state.questions
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions())
  }, [dispatch]);

  useEffect(() => {
    const savedPath = localStorage.getItem(SAVED_PATH);

    if (authedUser) {
      if (savedPath) {
        const questionId = savedPath.split('questions/')[1];
        if(questions && questions.find(it => it.id === questionId)) {
          navigate(PATH.HOME);
        } else {
          navigate(PATH.NOT_FOUND)
        }
       localStorage.removeItem(SAVED_PATH)
      } else {
        navigate(PATH.HOME);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authedUser]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitLogin = (e) => {
    setSubmit(true)
    e.preventDefault();
    const user = users
      ? users.find((user) => user.id === username && user.password === password)
      : null;

    if (user) {
      setError(false)
      dispatch(setAuthedUser(user));
    } else {
      setError(true)
    } 
  };

  return (
    <div className="login-container">
      <h2 className="mt-1 mb-1 center">Employee Poll</h2>
      <img src={Logo} alt="Employee Poll" />
      <h2>Login</h2>
      {error || hasError ? (<Error msg={error || 'Username doesn\'t exist or password is not correct'} />): ''}

      <form onSubmit={submitLogin} className="login-form">
        <Input
          label="Username"
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required         
          errorMessage="Username is required"
          hasError={hasSubmit && !username}
        />
        <Input
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
          errorMessage="Password is required"
          hasError={hasSubmit && !password}
        />

        <Button type="submit">Login</Button>
      </form>
      <Loader open={authenLoading || questionLoading} />
    </div>
  );
};

export default Login;
