export const formatQuestionWithFullAuthorInfo = (question, users) => {
  return {
    ...question,
    author: users ? users.find((user) => user.id === question.author) : null,
  };
};

export const sortUserToTotalAnsweredAndQuestions = (users) => {
  return [...users].sort((a, b) => {
    const totalA = Object.keys(a.answers).length + a.questions.length;
    const totalB = Object.keys(b.answers).length + b.questions.length;
    return totalB - totalA;
  });
};

export const formatAnsweredQuestion = (question, user) => {
  const optionOneSelected =
    question.optionOne && question.optionOne.votes.includes(user);
  const optionTwoSelected =
    question.optionTwo && question.optionTwo.votes.includes(user);
  const isAnswered = !!(optionOneSelected || optionTwoSelected);
  let optionOne = {
    ...question.optionOne,
  };
  let optionTwo = {
    ...question.optionTwo,
  };
  if (isAnswered) {
    optionOne = {
      ...optionOne,
      count: question.optionOne.votes.length,
      percentage: (
        (100 * question.optionOne.votes.length) /
        (question.optionOne.votes.length + question.optionTwo.votes.length)
      ).toFixed(2),
    };
    optionTwo = {
      ...optionTwo,
      count: question.optionTwo.votes.length,
      percentage: (
        (100 * question.optionTwo.votes.length) /
        (question.optionOne.votes.length + question.optionTwo.votes.length)
      ).toFixed(2),
    };
  }
  return {
    ...question,
    optionOne,
    optionTwo,
    isAnswered,
    optionOneSelected,
    optionTwoSelected,
  };
};

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const timeString = `${formattedHours}:${formattedMinutes} ${formattedTime}`;

  const month = date.getMonth() + 1; // Months are 0-based
  const day = date.getDate();
  const year = date.getFullYear();

  const dateString = `${month}/${day}/${year}`;
  return `${timeString} | ${dateString}`;
};
