import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {adminReducer, authReducer, commentReducer, groupReducer, orderReducer, userReducer} from "./slice";
import { detailReducer} from './slice'


const rootReducer = combineReducers({
    adminReducer,
    authReducer,
    commentReducer,
    orderReducer,
    userReducer,
    groupReducer,
    detailReducer,
});

const setupStore = () => configureStore({
    reducer: rootReducer
})

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']

export type {
    RootState,
    AppStore,
    AppDispatch
}

export {
    setupStore
}