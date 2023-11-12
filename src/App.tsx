import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";

import { RequiredAuth } from "./hoc";
import { MainLayout } from "./layouts";
import {
  AccountActivationPage,
  AdminPage,
  HomePage,
  LoginPage,
  LogoutPage,
  OrdersPage,
  UserPage,
  UsersPage,
} from "./pages";

const App = () => (
  <Routes>
    <Route path={"/"} element={<MainLayout />}>
      <Route index element={<Navigate to={"login"} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path={"activate/:activationToken"}
        element={
          <RequiredAuth>
            <AccountActivationPage />
          </RequiredAuth>
        }
      />
      <Route
        path={"logout"}
        element={
          <RequiredAuth>
            <LogoutPage />
          </RequiredAuth>
        }
      />
      <Route
        path={"/"}
        element={
          <RequiredAuth>
            <HomePage />
          </RequiredAuth>
        }
      >
        <Route index element={<Navigate to={"orders"} />} />
        <Route
          path={"orders"}
          element={
            <RequiredAuth>
              <OrdersPage />
            </RequiredAuth>
          }
        />

        <Route
          path={"users/:id"}
          element={
            <RequiredAuth>
              <UserPage />
            </RequiredAuth>
          }
        />

        <Route
          path={"adminPanel"}
          element={
            <RequiredAuth>
              <AdminPage />
            </RequiredAuth>
          }
        >
          <Route
            path={"users"}
            element={
              <RequiredAuth>
                <UsersPage />
              </RequiredAuth>
            }
          />
        </Route>
      </Route>
    </Route>
  </Routes>
);

export default App;
