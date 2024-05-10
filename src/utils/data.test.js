import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

jest.setTimeout(10000); // Set timeout to 10 seconds

describe("_saveQuestion function", () => {
  test("returns formatted question when valid input is provided", async () => {
    // Define input question
    const question = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "sarahedo",
    };

    const result = await _saveQuestion(question);

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        timestamp: expect.any(Number),
        author: "sarahedo",
        optionOne: {
          votes: [],
          text: "Option One",
        },
        optionTwo: {
          votes: [],
          text: "Option Two",
        },
      })
    );
  });

  test("rejects with error message when invalid input is provided", async () => {
    const question = {
      optionOneText: "",
      optionTwoText: "Option Two",
      author: "user123",
    };

    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer function", () => {
  test("resolves with true when valid input is provided", async () => {
    // Define valid input
    const input = {
      authedUser: "tylermcginnis",
      qid: "6ni6ok3ym7mf1p33lnez",
      answer: "optionOne",
    };

    // Call the function and wait for the Promise to resolve
    const result = await _saveQuestionAnswer(input);

    // Assert that the result is true
    expect(result).toBe(true);
  });

  test("rejects with error message when invalid input is provided", async () => {
    // Define invalid input
    const input = {
      authedUser: "",
      qid: "question123",
      answer: "optionOne",
    };

    // Call the function and expect it to reject with an error message
    await expect(_saveQuestionAnswer(input)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
