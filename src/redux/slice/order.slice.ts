import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";

import {IError, IOrder, IPagination} from "../../interfaces";
import {orderService} from "../../services";

interface IState {
    orders: IOrder[],
    page: number,
    pages: number,
    totalOrders: number,
    errors: IError,
    trigger: boolean,
    orderForUpdate: IOrder
}

const initialState: IState = {
    orders: [],
    page: null,
    pages: null,
    totalOrders: null,
    errors: null,
    orderForUpdate: null,
    trigger: false
};


const getAll = createAsyncThunk<IPagination<IOrder[]>, void>(
    'orderSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await orderService.getAll();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const update = createAsyncThunk<void, { order: IOrder, id: number }>(
    'orderSlice/update',
    async ({id, order}, {rejectWithValue}) => {
        try {
            await orderService.updateById(id, order)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const deleteOrder = createAsyncThunk<void, { id: number }>(
    'orderSlice/deleteOrder',
    async ({id}, {rejectWithValue}) => {
        try {
            await orderService.deleteById(id)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const slice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setOrderForUpdate: (state, action) => {
            state.orderForUpdate = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                const {page, pages, countItem, entities} = action.payload;
                state.orders = entities
                state.page = page
                state.pages = pages
                state.totalOrders = countItem
            })
            .addCase(update.fulfilled, state => {
                state.orderForUpdate = null
            })
            .addMatcher(isFulfilled(), state => {
                state.errors = null
            })
            .addMatcher(isFulfilled( update, deleteOrder), state => {
                state.trigger = !state.trigger
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errors = action.payload
            })
});

const {actions, reducer: orderReducer} = slice;

const orderActions = {
    ...actions,
    getAll,
    update,
    deleteOrder
}

export {
    orderActions,
    orderReducer
}