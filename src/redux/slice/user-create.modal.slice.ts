import { createSlice } from '@reduxjs/toolkit';
interface IState {
    isUserCreateModalOpen: boolean,
}
const initialState: IState = {
    isUserCreateModalOpen: false

}

const slice = createSlice({
    name: 'userCreateModal',
    initialState,
    reducers: {
        openUserCreateModal: (state) => {
            state.isUserCreateModalOpen = true;
        },
        closeUserCreateModal: (state) => {
            state.isUserCreateModalOpen = false;
        },
    },
});
const { actions, reducer: userModalReducer} = slice;
const userModalActions = {
    ...actions,
}
export {
    userModalActions,
    userModalReducer,
}