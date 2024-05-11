import React from 'react';
import {  useSelector } from 'react-redux';

import { sortUserToTotalAnsweredAndQuestions } from '../../utils/helper';
import Header from '../common/Header';
import Loader from '../common/Loader';
import Error from "../common/Error";
import { RootState } from "../../redux/store";


const LeaderBoard = () => {
  const { users, isLoading, error } = useSelector((state: RootState) => state.authentication);

  const sortedUsers = sortUserToTotalAnsweredAndQuestions(users)

  return (
    <>
    <Header />
    <div className="container">
      <h2>Leaderboard</h2>
      {error ? (<Error msg={error} />): ''}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((data) => (
            <tr key={data.id}>
              <td>
                <div className="user-info">
                  <img
                    src={data.avatarURL}
                    alt={`${data.name} Avatar`}
                    className="user-avatar"
                  />
                  <span>{data.name}</span>
                </div>
              </td>
              <td>{Object.keys(data.answers).length}</td>
              <td>{data.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Loader open={isLoading} />
    </div>
    </>
  );
};

export default LeaderBoard;
