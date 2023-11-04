import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
    adminReducer,
    authReducer,
    commentReducer,
    groupReducer,
    orderModalReducer,
    orderReducer,
    userReducer,
    userModalReducer
} from "./slice";


const rootReducer = combineReducers({
    adminReducer,
    authReducer,
    commentReducer,
    orderReducer,
    userReducer,
    groupReducer,
    orderModalReducer,
    userModalReducer,
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