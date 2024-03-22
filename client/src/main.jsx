import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@mantine/core/styles.css";
import { Provider } from "react-redux";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { MantineProvider, createTheme, rem } from "@mantine/core";
import Home from "./pages/dashboard.jsx";
import Login from "./pages/login.jsx";
import SignUp from "./pages/sign_up.jsx";
import { ApiContext } from "./utils/api.js";
import { Api } from "./utils/api.js";
import { UserProvider } from "./utils/user.jsx";
import appTheme from "./theme.js";
import Reptile from "./pages/reptile.jsx";
import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
const router = createHashRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
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
        path: "/reptile",
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
