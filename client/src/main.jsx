import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@mantine/core/styles.css";
import { Provider } from "react-redux";
import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import { MantineProvider, createTheme, rem } from "@mantine/core";
import Dashboard from "./pages/dashboard.jsx";
import SignUp from "./pages/sign_up.jsx";
import { ApiContext } from "./utils/api.js";
import { Api } from "./utils/api.js";
import { UserProvider } from "./utils/user.jsx";
import appTheme from "./theme.js";
import Reptile from "./pages/reptile.jsx";
import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Login from "./pages/Login.jsx";
const router = createHashRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign_up",
        element: <SignUp />,
      },
      {
        path: "/reptiles",
        element: <Reptile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MantineProvider theme={appTheme}>
        <ApiContext.Provider value={new Api()}>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </ApiContext.Provider>
      </MantineProvider>
    </PersistGate>
  </Provider>
);
