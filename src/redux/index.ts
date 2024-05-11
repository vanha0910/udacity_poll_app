import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./question/questionsSlice";
import authenticationReducer from "./auth/authenticationSlice";

const store = configureStore({
  reducer: {
    questions: questionsReducer,
    authentication: authenticationReducer,
  },
});

export default store;
