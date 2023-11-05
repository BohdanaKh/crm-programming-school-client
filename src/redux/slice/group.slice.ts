import {IGroup, IError} from "../../interfaces";
import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";

import {AxiosError} from "axios";
import {groupService} from "../../services";


interface IState {
   groups: IGroup[],
    errors: IError,
    trigger: boolean,
}

const initialState: IState = {
    groups: null,
    errors: null,
    trigger: false
};

const getAll = createAsyncThunk<IGroup[], void> (
    'groupSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
           const { data} = await groupService.getAll()
            return data;

        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const create = createAsyncThunk<void,  IGroup >(
    'commentSlice/create',
    async (group, {rejectWithValue}) => {
        try {
            await groupService.create(group)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)


const slice = createSlice({
    name: 'groupSlice',
    initialState,
    reducers: {
        setTrigger : (state) => {
            state.trigger = !state.trigger
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action )=> {
                state.groups = action.payload;
            })
            .addMatcher(isFulfilled(), state => {
                state.errors = null
            })
            .addMatcher(isFulfilled(create), state => {
                state.trigger = !state.trigger
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errors = action.payload
            })
});

const {actions, reducer: groupReducer} = slice;

const groupActions = {
    ...actions,
    getAll,
    create,

}

export {
    groupActions,
    groupReducer
}