import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";

const router = createBrowserRouter([
 {
    path: "/",
    id: "homePage",
    element: <Home />,
  },
  {
    path: "/createUser",
    id: "createUser",
    element: <CreateUser />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
