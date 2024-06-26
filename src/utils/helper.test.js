import {
  sortUserToTotalAnsweredAndQuestions,
  formatAnsweredQuestion,
  formatQuestionWithFullAuthorInfo,
} from "./helper";

describe("sortUserToTotalAnsweredAndQuestions", () => {
  it("sorts users based on total answered and questions in ascending order", () => {
    const users = [
      {
        answers: { question1: "optionOne" },
        questions: [
          "question1",
          "question2",
          "question4",
          "question5",
          "question6",
        ],
      },
      {
        answers: { question1: "optionTwo", question2: "optionTwo" },
        questions: [],
      },
      {
        answers: { question1: "optionTwo", question2: "optionTwo" },
        questions: ["question1", "question2", "question3"],
      },
    ];

    const sortedUsers = sortUserToTotalAnsweredAndQuestions(users);

    expect(sortedUsers[2].questions).toEqual([]);
    expect(sortedUsers[2].answers).toEqual({
      question1: "optionTwo",
      question2: "optionTwo",
    });

    expect(sortedUsers[1].questions).toEqual([
      "question1",
      "question2",
      "question3",
    ]);
    expect(sortedUsers[1].answers).toEqual({
      question1: "optionTwo",
      question2: "optionTwo",
    });
    expect(sortedUsers[0].questions).toEqual([
      "question1",
      "question2",
      "question4",
      "question5",
      "question6",
    ]);
    expect(sortedUsers[0].answers).toEqual({ question1: "optionOne" });
  });

  it("returns an empty array when users array is empty", () => {
    const users = [];
    const sortedUsers = sortUserToTotalAnsweredAndQuestions(users);
    expect(sortedUsers).toEqual([]);
  });

  it("returns users array as is when all users have same total answered and questions count", () => {
    const users = [
      {
        id: "user1",
        answers: { question1: "optionOne", question2: "optionTwo" },
        questions: ["question1", "question2"],
      },
      {
        id: "user2",
        answers: { question1: "optionOne", question2: "optionTwo" },
        questions: ["question1", "question2"],
      },
    ];
    const sortedUsers = sortUserToTotalAnsweredAndQuestions(users);
    expect(sortedUsers).toEqual(users);
  });
}); // Update 'yourFilePath' with the correct path to your function

describe("formatAnsweredQuestion", () => {
  it("formats a question that the user has not answered", () => {
    const question = {
      id: "question1",
      optionOne: {
        text: "Option One",
        votes: [],
      },
      optionTwo: {
        text: "Option Two",
        votes: [],
      },
    };
    const user = "user1";
    const formattedQuestion = formatAnsweredQuestion(question, user);
    expect(formattedQuestion).toEqual({
      id: "question1",
      optionOne: {
        text: "Option One",
        votes: [],
      },
      optionTwo: {
        text: "Option Two",
        votes: [],
      },
      isAnswered: false,
      optionOneSelected: false,
      optionTwoSelected: false,
    });
  });

  it("formats a question that the user has answered", () => {
    const question = {
      id: "question2",
      optionOne: {
        text: "Option One",
        votes: ["user1", "user2"],
      },
      optionTwo: {
        text: "Option Two",
        votes: ["user3"],
      },
    };
    const user = "user1";
    const formattedQuestion = formatAnsweredQuestion(question, user);
    expect(formattedQuestion).toEqual({
      id: "question2",
      optionOne: {
        text: "Option One",
        votes: ["user1", "user2"],
        count: 2,
        percentage: "66.67",
      },
      optionTwo: {
        text: "Option Two",
        votes: ["user3"],
        count: 1,
        percentage: "33.33",
      },
      isAnswered: true,
      optionOneSelected: true,
      optionTwoSelected: false,
    });
  });

  it("formats a question with no votes", () => {
    const question = {
      id: "question3",
      optionOne: {
        text: "Option One",
        votes: [],
      },
      optionTwo: {
        text: "Option Two",
        votes: [],
      },
    };
    const user = "user1";
    const formattedQuestion = formatAnsweredQuestion(question, user);
    expect(formattedQuestion).toEqual({
      id: "question3",
      optionOne: {
        text: "Option One",
        votes: [],
      },
      optionTwo: {
        text: "Option Two",
        votes: [],
      },
      isAnswered: false,
      optionOneSelected: false,
      optionTwoSelected: false,
    });
  });
});

describe("formatQuestionWithFullAuthorInfo", () => {
  const question = {
    id: "1",
    text: "Sample question text",
    author: "user1",
  };

  const users = [
    { id: "user1", name: "John Doe" },
    { id: "user2", name: "Jane Smith" },
  ];

  it("should return formatted question with full author info", () => {
    const formattedQuestion = formatQuestionWithFullAuthorInfo(question, users);

    expect(formattedQuestion).toEqual({
      id: "1",
      text: "Sample question text",
      author: { id: "user1", name: "John Doe" },
    });
  });

  it("should return null if user with author id is not found", () => {
    const formattedQuestion = formatQuestionWithFullAuthorInfo(
      { ...question, author: "unknownUser" },
      null
    );

    expect(formattedQuestion.author).toBeNull();
  });
});
