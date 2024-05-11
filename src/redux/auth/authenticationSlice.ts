import { createSlice, createAsyncThunk, AsyncThunkAction } from "@reduxjs/toolkit";
import { _getUsers } from "../../utils/_DATA";
import { AuthInitialState } from "../type";

export const fetchUsers = createAsyncThunk(
  "authentication/fetchUsers",
  async () => {
    return await _getUsers();
  }
) ;

const initialState: AuthInitialState = {
  authedUser: null,
  isLoading: false,
  error: null,
  users: [],
}

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthedUser: (state, action) => {
      state.authedUser = action.payload;
    },
    setUsers: (state, action) => {
      const index = state.users.findIndex(
        (item) => item.id === action.payload.author
      );
      const users = [...state.users];
      if (action.payload.question) {
        users[index] = {
          ...users[index],
          questions: [...users[index].questions, action.payload.question],
        };
      }
      if (action.payload.answer) {
        users[index] = {
          ...users[index],
          answers: {
            ...users[index].answers,
            [action.payload.answer.id]: action.payload.answer.option,
          },
        };
      }
      state.users = users;
    },
    logoutUser: (state) => {
      state.authedUser = null;
    },
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload && Object.values(action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? '';
      });
  },
});

export const { setAuthedUser, logoutUser, setUsers } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
