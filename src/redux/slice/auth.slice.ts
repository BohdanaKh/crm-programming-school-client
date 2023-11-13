import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import type { IAuth, IError, IUser } from "../../interfaces";
import { authService } from "../../services";

interface IState {
  error: IError;
  me: IUser;
}

const initialState: IState = {
  error: null,
  me: null,
};

const login = createAsyncThunk<IUser, IAuth>(
  "authSlice/login",
  async (user, { rejectWithValue }) => {
    try {
      return await authService.login(user);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const refresh = createAsyncThunk<IUser, void>(
  "authSlice/refresh",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.refresh();
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const slice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.me = action.payload;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.me = action.payload;
      })
      .addMatcher(isFulfilled(), (state) => {
        state.error = null;
      })
      .addMatcher(isRejectedWithValue(), (state, action) => {
        state.error = action.payload;
      }),
});

const { actions, reducer: authReducer } = slice;

const authActions = {
  ...actions,
  login,
  refresh,
};

export { authReducer, authActions };
