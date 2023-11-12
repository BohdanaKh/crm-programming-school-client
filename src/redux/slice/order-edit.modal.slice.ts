import { createSlice } from "@reduxjs/toolkit";

interface IState {
  isOrderEditModalOpen: boolean;
}
const initialState: IState = {
  isOrderEditModalOpen: false,
};

const slice = createSlice({
  name: "orderEditModal",
  initialState,
  reducers: {
    openOrderEditModal: (state) => {
      state.isOrderEditModalOpen = true;
    },
    closeOrderEditModal: (state) => {
      state.isOrderEditModalOpen = false;
    },
  },
});
const { actions, reducer: orderModalReducer } = slice;
const orderModalActions = {
  ...actions,
};
export { orderModalActions, orderModalReducer };
