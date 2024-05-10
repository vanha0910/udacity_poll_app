import React from "react";
import { Link } from "react-router-dom";
import { formatTimestamp } from "../../utils/helper"; // Assuming formatTimestamp is defined in a separate file
import { PATH } from "../../constansts";

const QuestionCard = ({ question }) => {
  return (
    <div key={question.id} className="card">
      <div className="card-body">
        <h4>{question.author && question.author.name}</h4>
        <p>{question.timestamp && formatTimestamp(question.timestamp)}</p>
        <button type="button" className="btn-outline btn">
          <Link to={PATH.QUESTION_PREFIX + question.id}>Show</Link>
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
