import {Navigate, Route, Routes} from 'react-router-dom';

import  './App.css';
import {MainLayout} from './layouts';
import {RequiredAuth} from './hoc';
import {AccountActivationPage, AdminPage, LoginPage, OrdersPage, UserPage, UsersPage, LogoutPage, HomePage} from "./pages";


const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'login'}/>}/>
            <Route path="/login" element={<LoginPage />}></Route>
                <Route path={'activate/:activationToken'} element={<AccountActivationPage/>}></Route>
                <Route path={'logout'} element={<LogoutPage/>}></Route>
                    <Route path={'/'} element={<HomePage/>}>
                        <Route index element={<Navigate to={'orders'}/>}/>
                <Route path={'orders'} element={
                    // <RequiredAuth>
                        <OrdersPage/>}/>
                     {/*</RequiredAuth>}/>*/}

                        <Route path={'users/:id'} element={
                            // <RequiredAuth>
                            <UserPage/>
                            // </RequiredAuth>
                        }/>

                <Route path={'adminPanel'} element={
                    // <RequiredAuth>
                        <AdminPage/>
                    // </RequiredAuth>
                }>
                    <Route path={'users'} element={
                        // <RequiredAuth>
                        <UsersPage/>
                    // </RequiredAuth>
                    }/>
                </Route>
                        </Route>
                </Route>
        </Routes>
    );
};

export default App;
