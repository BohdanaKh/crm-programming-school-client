import {IError, IOrderStats} from "../../interfaces";
import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";

import {AxiosError} from "axios";
import {adminService} from "../../services";


interface IState {
    data: IOrderStats,
    errors: IError,
    trigger: boolean,
}

const initialState: IState = {
    data: null,
    errors: null,
    trigger: false
};

const getAdminPanel = createAsyncThunk<IOrderStats, void> (
    'adminSlice/getAdminPanel',
    async (_, {rejectWithValue}) => {
        try {
            await adminService.getAdminPanel()
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
    name: 'adminSlice',
    initialState,
    reducers: {
    },
    extraReducers: builder =>
        builder
            .addMatcher(isFulfilled(), state => {
                state.errors = null
            })
            .addMatcher(isFulfilled(getAdminPanel), (state, action )=> {
                state.data = action.payload
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errors = action.payload
            })
});

const {actions, reducer: adminReducer} = slice;

const adminActions = {
    ...actions,
    getAdminPanel,

}

export {
    adminActions,
    adminReducer
}