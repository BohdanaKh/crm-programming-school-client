import {IError, IPagination, IUser} from "../../interfaces";
import {userService} from "../../services";
import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

interface IState {
    users: IUser[],
    page: number,
    pages: number,
    totalUsers: number,
    error: IError,
    trigger: boolean,
    userForUpdate: IUser,

}

const initialState: IState = {
    users: [],
    page: null,
    pages: null,
    totalUsers: null,
    error: null,
    userForUpdate: null,
    trigger: false,
};


const getAll = createAsyncThunk<IPagination<IUser[]>, void>(
    'userSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.getAll();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const create = createAsyncThunk<void, { user: IUser }>(
    'userSlice/create',
    async ({user}, {rejectWithValue}) => {
        try {
            await userService.create(user)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const update = createAsyncThunk<void, { user: IUser, id: number }>(
    'userSlice/update',
    async ({id, user}, {rejectWithValue}) => {
        try {
            await userService.updateById(id, user)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const deleteUser = createAsyncThunk<void, { id: number }>(
    'userSlice/deleteUser',
    async ({id}, {rejectWithValue}) => {
        try {
            await userService.deleteById(id)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const activateUser = createAsyncThunk<void, { id: number }>(
    'userSlice/activateUser',
    async ({id}, {rejectWithValue}) => {
        try {
            await userService.activateById(id)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const banUser = createAsyncThunk<void, { id: number }>(
    'userSlice/banUser',
    async ({id}, {rejectWithValue}) => {
        try {
            await userService.banById(id)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const unbanUser = createAsyncThunk<void, { id: number }>(
    'userSlice/unbanUser',
    async ({id}, {rejectWithValue}) => {
        try {
            await userService.unbanById(id)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const slice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserForUpdate: (state, action) => {
            state.userForUpdate = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                const {page, pages, countItem, entities} = action.payload;
                state.users = entities
                state.page = page
                state.pages = pages
                state.totalUsers = countItem
            })
            .addCase(update.fulfilled, state => {
                state.userForUpdate = null
            })
            .addMatcher(isFulfilled(), state => {
                state.error = null
            })
            .addMatcher(isFulfilled(create, update, deleteUser, activateUser, banUser, unbanUser), state => {
                state.trigger = !state.trigger
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.error = action.payload
            })
});

const {actions, reducer: userReducer} = slice;

const userActions = {
    ...actions,
    getAll,
    create,
    update,
    deleteUser,
    activateUser,
    banUser,
    unbanUser,
}

export {
    userActions,
    userReducer
}