import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";

import {IComment, IError, IOrder, IPagination} from "../../interfaces";
import {orderService} from "../../services";

interface IState {
    orders: IOrder[],
    page: number,
    pages: number,
    totalOrders: number,
    errors: IError,
    trigger: boolean,
    orderForUpdate: IOrder,
    sort: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    age: number,
    course: string,
    course_format: string,
    course_type: string,
    status: string,
    group: string,
    utm: string,
    msg: string,
    comments: IComment[]

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
    name: null,
    surname: null,
    email: null,
    phone: null,
    age:  null,
    course: null,
    course_format: null,
    course_type: null,
    status: null,
    group: null,
    utm: null,
    msg: null,
    comments: null,

};


// const getAll = createAsyncThunk<IPagination<IOrder[]>, number>(
//     'orderSlice/getAll',
//     async (page, {rejectWithValue}) => {
//         try {
//             const {data} = await orderService.getAll(page);
//             return data
//         } catch (e) {
//             const err = e as AxiosError
//             return rejectWithValue(err.response.data)
//         }
//     }
// )

const getAll = createAsyncThunk<IPagination<IOrder[]>, any>(
    'orderSlice/getAllWithFilters',
    async ({page, ...params}, {rejectWithValue}) => {
        try {
            const {data} = await orderService.getAll({page, ...params});
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
        },

        setPage: (state, action) => {
            state.page = action.payload;
        },
        setSort: ( state, action) => {
            state.sort= action.payload;
        },

        setName: ( state, action) => {
            state.name= action.payload;
        },
        setSurname: ( state, action) => {
            state.surname= action.payload;
        },
        setCourse: ( state, action) => {
            state.course= action.payload;
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
    deleteOrder,

}

export {
    orderActions,
    orderReducer
}