import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute, RequiredAuth } from "./hoc";
import { MainLayout } from "./layouts";
import {
  AccountActivationPage,
  AdminPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  OrdersPage,
  RecoveryPasswordPage,
  UserPage,
  UsersPage,
} from "./pages";

const App = () => (
  <Routes>
    <Route path={"/"} element={<MainLayout />}>
      <Route index element={<Navigate to={"login"} />} />
      <Route
        path="/login"
        element={
          <ProtectedRoute>
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={"activate/:activationToken"}
        element={<AccountActivationPage />}
      />
      <Route
        path={"recovery/:recoveryToken"}
        element={<RecoveryPasswordPage />}
      />
      <Route
        path={"logout"}
        element={
          <RequiredAuth roles={["admin", "manager"]}>
            <LoginPage />
          </RequiredAuth>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
      <Route
        path={"/"}
        element={
          <RequiredAuth roles={["admin", "manager"]}>
            <HomePage />
          </RequiredAuth>
        }
      >
        <Route index element={<Navigate to={"orders"} />} />
        <Route
          path={"orders"}
          element={
            <RequiredAuth roles={["admin", "manager"]}>
              <OrdersPage />
            </RequiredAuth>
          }
        />

        <Route
          path={"users/:id"}
          element={
            <RequiredAuth roles={["admin", "manager"]}>
              <UserPage />
            </RequiredAuth>
          }
        />

        <Route
          path={"adminPanel"}
          element={
            <RequiredAuth roles={["admin"]}>
              <AdminPage />
            </RequiredAuth>
          }
        />
        <Route
          path={"users"}
          element={
            <RequiredAuth roles={["admin"]}>
              <UsersPage />
            </RequiredAuth>
          }
        />
      </Route>
    </Route>
  </Routes>
);

export default App;
