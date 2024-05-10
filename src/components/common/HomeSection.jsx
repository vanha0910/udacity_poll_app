import React from "react";
import QuestionCard from "./QuestionCard";

const HomeSection = ({ data, title }) => {
  return (
    <div className="section">
      <div className="section-header">{title}</div>
      <div className="section-container">
        {data &&
          data.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
      </div>
    </div>
  );
};

export default HomeSection;
