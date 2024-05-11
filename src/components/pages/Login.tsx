import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useLocation, useNavigate } from 'react-router-dom';

import Logo   from '../../assets/img/teams.jpeg';
import { PATH , REGEX_PATH} from '../../constansts';
import { fetchUsers, setAuthedUser } from '../../redux/auth/authenticationSlice';
import { fetchQuestions } from '../../redux/question/questionsSlice';
import Button from '../common/Button';
import Error from '../common/Error';
import Input from '../common/Input';
import Loader from '../common/Loader';
import { RootState } from '@/redux/store';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasSubmit, setSubmit] = useState(false)
  const [hasError, setError] = useState(false)

  const dispatch = useDispatch<any>();
  const  {state}  = useLocation()
  const { isLoading: authenLoading, users, authedUser , error} = useSelector(
    (state: RootState) => state.authentication
  );
  const { isLoading : questionLoading, questions  } = useSelector(
    (state: RootState) => state.questions
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions())
  }, [dispatch]);

  useEffect(() => {
    if (authedUser) {
      if( state.path && state.path.match(REGEX_PATH)) {
        const id = state.path.split('/questions/')[1];
        if(questions && questions.find(it => it.id === id)) {
          navigate(state.path)
        } else {
          navigate(PATH.NOT_FOUND)
        }
       
      } else {
        navigate(state ? state.path : PATH.HOME)
      }
     
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authedUser]);

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const submitLogin = (e: any) => {
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
          data-testid="username"
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
          data-testid="password"
        />

        <Button type="submit" data-testid="login-btn">Login</Button>
      </form>
      <Loader open={authenLoading || questionLoading} />
    </div>
  );
};

export default Login;
