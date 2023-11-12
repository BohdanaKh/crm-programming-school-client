import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import type { IError, IPagination, IPass, IUser } from "../../interfaces";
import { userService } from "../../services";

interface IState {
  users: IUser[];
  page: number;
  pages: number;
  totalUsers: number;
  error: IError;
  trigger: boolean;
  userForUpdate: IUser;
  activationToken: string;
}

const initialState: IState = {
  users: [],
  page: null,
  pages: null,
  totalUsers: null,
  error: null,
  userForUpdate: null,
  trigger: false,
  activationToken: null,
};

const getAll = createAsyncThunk<IPagination<IUser[]>, { page: number }>(
  "userSlice/getAll",
  async ({ page }, { rejectWithValue }) => {
    try {
      const { data } = await userService.getAll(page);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);
const create = createAsyncThunk<void, { user: IUser }>(
  "userSlice/create",
  async ({ user }, { rejectWithValue }) => {
    try {
      await userService.create(user);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const update = createAsyncThunk<void, { user: IUser; id: number }>(
  "userSlice/update",
  async ({ id, user }, { rejectWithValue }) => {
    try {
      await userService.updateById(id, user);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const activateAccount = createAsyncThunk<
  void,
  { activationToken: string; data: IPass }
>(
  "userSlice/activateAccount",
  async ({ activationToken, data }, { rejectWithValue }) => {
    try {
      await userService.activate(activationToken, data);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const deleteUser = createAsyncThunk<void, { id: number }>(
  "userSlice/deleteUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      await userService.deleteById(id);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const activateUser = createAsyncThunk<string, { id: number }>(
  "userSlice/activateUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await userService.activateById(id);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const banUser = createAsyncThunk<void, { id: number }>(
  "userSlice/banUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      await userService.banById(id);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const unbanUser = createAsyncThunk<void, { id: number }>(
  "userSlice/unbanUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      await userService.unbanById(id);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);
const slice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserForUpdate: (state, action) => {
      state.userForUpdate = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        const { page, pages, countItem, entities } = action.payload;
        state.users = entities;
        state.page = page;
        state.pages = pages;
        state.totalUsers = countItem;
      })
      .addCase(update.fulfilled, (state) => {
        state.userForUpdate = null;
      })
      .addCase(activateUser.fulfilled, (state, action) => {
        state.activationToken = action.payload;
      })
      .addMatcher(isFulfilled(), (state) => {
        state.error = null;
      })
      .addMatcher(
        isFulfilled(
          create,
          update,
          deleteUser,
          activateUser,
          banUser,
          unbanUser,
          activateAccount,
        ),
        (state) => {
          state.trigger = !state.trigger;
        },
      )
      .addMatcher(isRejectedWithValue(), (state, action) => {
        state.error = action.payload;
      }),
});

const { actions, reducer: userReducer } = slice;

const userActions = {
  ...actions,
  getAll,
  create,
  update,
  deleteUser,
  activateUser,
  banUser,
  unbanUser,
  activateAccount,
};

export { userActions, userReducer };
