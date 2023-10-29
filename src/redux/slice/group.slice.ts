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
            await groupService.getAll()
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }

)

// const create = createAsyncThunk<void,  IGroup >(
//     'commentSlice/create',
//     async ({group}, {rejectWithValue}) => {
//         try {
//             await groupService.create(group)
//         } catch (e) {
//             const err = e as AxiosError
//             return rejectWithValue(err.response.data)
//         }
//     }
// )


const slice = createSlice({
    name: 'groupSlice',
    initialState,
    reducers: {
    },
    extraReducers: builder =>
        builder
            .addMatcher(isFulfilled(), state => {
                state.errors = null
            })
            .addMatcher(isFulfilled(getAll), (state, action )=> {
                state.groups = action.payload
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errors = action.payload
            })
});

const {actions, reducer: groupReducer} = slice;

const groupActions = {
    ...actions,
    getAll,

}

export {
    groupActions,
    groupReducer
}