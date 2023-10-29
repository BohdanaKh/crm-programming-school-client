import {Navigate, Route, Routes} from 'react-router-dom';

import {MainLayout} from './layouts';
import {RequiredAuth} from './hoc';
import {AdminPanel, LoginPage, OrdersPage, UsersPage} from "./pages";

const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<LoginPage/>}>
                <Route index element={<Navigate to={'login'}/>}/>
            </Route>
                <Route path={'/'} element={<MainLayout/>}>
                    {/*<Route index element={<Navigate to={'orders'}/>}/>*/}
                <Route path={'orders'} element={
                    // <RequiredAuth>
                        <OrdersPage/>}/>
                     {/*</RequiredAuth>}/>*/}
                <Route path={'users'} element={
                    // <RequiredAuth>
                        <UsersPage/>}/>
                     {/*</RequiredAuth>}/>*/}
                <Route path={'adminPanel'} element={
                    <RequiredAuth>
                        <AdminPanel/>
                    </RequiredAuth>
                }/>
                </Route>
        </Routes>
    );
};

export default App;
