import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Connexion from "./pages/Connexion";

const router = createBrowserRouter([
 {
    path: "/",
    id: "homePage",
    element: <Home />,
  },
  {
    path: "/connexion",
    id: "connexion",
    element: <Connexion />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
