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
import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import "@mantine/notifications/styles.css";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import CreateSchedule from "./pages/create_schedule.jsx";
import CreateHusbandryRecord from "./pages/create_husbandry.jsx";

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
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
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
        path: "/reptiles/:id?",
        element: <Reptile />,
      },
      {
        path: "/create_schedule",
        element: <CreateSchedule />,
      },
      {
        path: "/create_husbandry",
        element: <CreateHusbandryRecord />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      cacheTime: 1000 * 60 * 15, // 15 minutes
      useErrorBoundary: true,
      retry: 0,
    },
  },
});

// export const queryCache = new QueryCache();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={appTheme}>
          <Notifications />
          <ModalsProvider>
            <ApiContext.Provider value={new Api()}>
              <UserProvider>
                <RouterProvider router={router} />
              </UserProvider>
            </ApiContext.Provider>
          </ModalsProvider>
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
