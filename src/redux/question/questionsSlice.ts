import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../../utils/_DATA";
import { OPTION_ONE, OPTION_TWO } from "../../constansts";
import { QuestionInitialState } from "../type";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    return await _getQuestions();
  }
);

export const saveQuestion = createAsyncThunk(
  "questions/saveQuestion",
  async (question: any) => {
    return await _saveQuestion(question);
  }
);

export const answerQuestion = createAsyncThunk(
  "questions/answerQuestion",
  async (answer: any) => {
    return await _saveQuestionAnswer(answer);
  }
);

const initialState: QuestionInitialState = {
  questions: [],
  addedQuestion: null,
  isLoading: false,
  isCreatedSuccess: false,
  isAnsweredSuccess: false,
  error: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      const index = state.questions.findIndex(
        (item) => item.id === action.payload.id
      );

      const questions = [...state.questions];
      if (action.payload.answer === OPTION_ONE) {
        questions[index] = {
          ...questions[index],
          [OPTION_ONE]: {
            ...questions[index][OPTION_ONE],
            votes: [...questions[index][OPTION_ONE].votes, action.payload.user],
          },
        };
      }
      if (action.payload.answer === OPTION_TWO) {
        questions[index] = {
          ...questions[index],
          [OPTION_TWO]: {
            ...questions[index][OPTION_TWO],
            votes: [...questions[index][OPTION_TWO].votes, action.payload.user],
          },
        };
      }
      state.questions = questions;
    },
    resetState: (state, action) => {
      state.isLoading = false;
      state.isCreatedSuccess = false;
      state.isAnsweredSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questions = action.payload && Object.values(action.payload);
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "";
      })
      .addCase(saveQuestion.pending, (state) => {
        state.isLoading = true;
        state.isCreatedSuccess = false;
        state.error = null;
      })
      .addCase(saveQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreatedSuccess = true;
        state.addedQuestion = action.payload;
        state.questions = [...state.questions, action.payload];
      })
      .addCase(saveQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "";
        state.isCreatedSuccess = false;
      })
      .addCase(answerQuestion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAnsweredSuccess = false;
      })
      .addCase(answerQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAnsweredSuccess = true;
      })
      .addCase(answerQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "";
        state.isAnsweredSuccess = false;
      });
  },
});

export const { resetState, setAnswer } = questionsSlice.actions;

export default questionsSlice.reducer;
