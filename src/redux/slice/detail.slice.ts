import { createSlice } from '@reduxjs/toolkit';
import {IOrder} from "../../interfaces";
interface IState {
  open: boolean,
    selectedItemId: number,
}
const initialState: IState = {
    open: false, // Initially, the detail view is closed
        selectedItemId: null,
}

const slice = createSlice({
    name: 'detail',
    initialState,
    reducers: {
        openDetail: (state, action) => {
            state.open = true;
            state.selectedItemId = action.payload;
        },
        closeDetail: (state) => {
            state.open = false;
            state.selectedItemId = null;
        },
    },
});
 const { actions, reducer: detailReducer} = slice;
const detailActions = {
    ...actions,
}
export {
    detailActions,
    detailReducer,
}