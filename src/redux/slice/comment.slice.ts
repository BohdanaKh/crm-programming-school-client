import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";
import {IComment, IError} from "../../interfaces";
import {commentService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    comment: IComment,
    errors: IError,
    trigger: boolean,
}

const initialState: IState = {
    comment: null,
    errors: null,
    trigger: false
};



const create = createAsyncThunk<void, { orderId: number, comment: IComment }>(
    'commentSlice/create',
    async ({orderId, comment}, {rejectWithValue}) => {
        try {
            await commentService.create(orderId, comment)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)


const slice = createSlice({
    name: 'commentSlice',
    initialState,
    reducers: {
    },
    extraReducers: builder =>
        builder
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

const {actions, reducer: commentReducer} = slice;

const commentActions = {
    ...actions,
    create,

}

export {
    commentActions,
    commentReducer
}