import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import type { IError, IFilter, IOrder, IPagination } from "../../interfaces";
import { orderService } from "../../services";

interface IState {
  orders: IOrder[];
  page: number;
  pages: number;
  totalOrders: number;
  errors: IError;
  trigger: boolean;
  orderForUpdate: IOrder;
  sort: string;
  params: IFilter;
}

const initialState: IState = {
  orders: [],
  page: 1,
  pages: null,
  totalOrders: null,
  errors: null,
  orderForUpdate: null,
  trigger: false,
  sort: null,
  params: null,
};

const getAll = createAsyncThunk<IPagination<IOrder[]>, any>(
  "orderSlice/getAllWithFilters",
  async ({ page, ...params }, { rejectWithValue }) => {
    try {
      const { data } = await orderService.getAll({ page, ...params });
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const update = createAsyncThunk<void, { order: IOrder; id: number }>(
  "orderSlice/update",
  async ({ id, order }, { rejectWithValue }) => {
    try {
      await orderService.updateById(id, order);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const deleteOrder = createAsyncThunk<void, { id: number }>(
  "orderSlice/deleteOrder",
  async ({ id }, { rejectWithValue }) => {
    try {
      await orderService.deleteById(id);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);
const slice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    setOrderForUpdate: (state, action) => {
      state.orderForUpdate = action.payload;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },

    setTrigger: (state) => {
      state.trigger = !state.trigger;
    },
    setParams: (state, action) => {
      state.params = { ...state.params, ...action.payload };
    },
    setNullParams: (state) => {
      state.params = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        const { page, pages, countItem, entities } = action.payload;
        state.orders = entities;
        state.page = page;
        state.pages = pages;
        state.totalOrders = countItem;
      })
      .addCase(update.fulfilled, (state) => {
        state.orderForUpdate = null;
      })
      .addMatcher(isFulfilled(), (state) => {
        state.errors = null;
      })
      .addMatcher(isFulfilled(update, deleteOrder), (state) => {
        state.trigger = !state.trigger;
      })
      .addMatcher(isRejectedWithValue(), (state, action) => {
        state.errors = action.payload;
        state.orders = null;
      }),
});

const { actions, reducer: orderReducer } = slice;

const orderActions = {
  ...actions,
  getAll,
  update,
  deleteOrder,
};

export { orderActions, orderReducer };
