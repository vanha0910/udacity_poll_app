import React from "react";
import QuestionCard from "./QuestionCard";
import { QuestionWithAuthor } from "../../redux/type";

interface HomeSectionProps {
  data: QuestionWithAuthor[];
  title: string;
}

const HomeSection = ({ data, title }: HomeSectionProps) => {
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
