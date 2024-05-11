import React from "react";
import { OPTION_ONE, OPTION_TWO } from "../../constansts";
import { QuestionWithAuthor } from "../../redux/type";

export interface OptionDetailsProps  {
  questionDetails: QuestionWithAuthor;
  type: string;
  onSelect : (param: string) => void;
}
const OptionDetails = ({ questionDetails, type, onSelect }: OptionDetailsProps) => {
  return (
    <div className={`option-wrapper `}>
      {(type === OPTION_ONE && questionDetails.optionOneSelected) ||
      (type === OPTION_TWO && questionDetails.optionTwoSelected) ? (
        <img
          src="https://img.freepik.com/free-psd/check-symbol-isolated_23-2150500356.jpg"
          alt="selected"
        />
      ) : (
        ""
      )}
      <div className="option second">
        {type === OPTION_ONE
          ? questionDetails?.optionOne?.text
          : questionDetails?.optionTwo?.text}
      </div>
      {questionDetails?.isAnswered ? (
        <>
          <div className="option second">
            Number of people selected :{" "}
            {type === OPTION_ONE
              ? questionDetails?.optionOne?.count
              : questionDetails?.optionTwo?.count}
          </div>
          <div className="option second no-border">
            Percentage :{" "}
            {type === OPTION_ONE
              ? questionDetails?.optionOne?.percentage
              : questionDetails?.optionTwo?.percentage}
            %
          </div>
        </>
      ) : (
        <div
          className="option-action option"
          onClick={() =>
            type === OPTION_ONE ? onSelect(OPTION_ONE) : onSelect(OPTION_TWO)
          }
        >
          Click
        </div>
      )}
    </div>
  );
};

export default OptionDetails;
