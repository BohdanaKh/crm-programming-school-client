import {IError, IOrderStats, IStatusStats} from "../../interfaces";
import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";

import {AxiosError} from "axios";
import {adminService} from "../../services";


interface IState {
    totalOrdersCount: number;
    statusCounts: IStatusStats[];
    errors: IError,
    trigger: boolean,
    showUsers: boolean,
}

const initialState: IState = {
    totalOrdersCount: null,
    statusCounts: null,
    errors: null,
    trigger: false,
    showUsers: false,
};

const getAdminPanel = createAsyncThunk<IOrderStats, void> (
    'adminSlice/getAdminPanel',
    async (_, {rejectWithValue}) => {
        try {
           const {data} = await adminService.getAdminPanel();
           return data;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }

)



const slice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        setShowUsers: ( state) => {
            state.showUsers = !state.showUsers
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAdminPanel.fulfilled, (state, action )=> {
                const { totalOrdersCount, statusCounts} = action.payload
                state.statusCounts = statusCounts;
                state.totalOrdersCount = totalOrdersCount;
            })
            .addMatcher(isFulfilled(), state => {
                state.errors = null
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