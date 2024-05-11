export interface User {
  id: string;
  password: string;
  name: string;
  avatarURL: string;
  answers: { [key: string]: string };
  questions: string[];
}

export interface Question {
  id: string;
  author: string;
  timestamp: number;
  optionOne: {
    votes: string[];
    text: string;
  };
  optionTwo: {
    votes: string[];
    text: string;
  };
}

export interface QuestionWithAuthor {
    id: string;
    author: User;
    timestamp: number;
    optionOne: {
      votes: string[];
      text: string;
      count: number;
      percentage: string;
    };
    optionTwo: {
      votes: string[];
      text: string;
      count: number;
      percentage: string;
    };
    optionOneSelected: boolean;
    optionTwoSelected: boolean;
    isAnswered: boolean;
  }


export interface AuthInitialState {
  authedUser: User | null;
  isLoading: boolean;
  error: string | null;
  users: User[];
}

export interface QuestionInitialState {
  questions: Question[];
  addedQuestion: Question | null;
  isLoading: boolean;
  isCreatedSuccess: boolean;
  isAnsweredSuccess: boolean;
  error: string | null;
}
